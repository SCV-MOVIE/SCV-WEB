import React from 'react';
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { RefreshRight } from '@root/public/icons';
import { BookStep, BookStepContent, BookStepReducer, InitialStepValue } from './ModalReducer';
import { BookContextProvider, initialSelectedMovieValue, SelectedMovie } from './BookContext';
import { pretendard } from '@root/src/pages/_app';
import { forPhoneNumber, forSecurityNumber, getAge, totalPrice } from '@root/src/utils';
import { Partner, ShowTime } from '@root/src/@types';
import { useUserInfo } from '@root/src/hooks';
import { api } from '@root/src/api';
import { AxiosError } from 'axios';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  partners: Partner[];
  showTimes: ShowTime[];
}

const isCompleteCurrentStep = (step: BookStep, value: SelectedMovie, userAge: number) => {
  if (step === BookStep.MOVIE) {
    if (value.movie?.rating === '18+' && userAge < 20) {
      alert('성인이 아닙니다.');
      return false;
    }
    return value.movie.name !== '' && value.showTime.id !== -1;
  } else if (step === BookStep.INFORMATION) {
    const age = getAge(value.information.securityFrontNumber);
    if (age < 15) {
      alert('법정 대리인이 예매해야 합니다.');
      return false;
    }
    if (value.movie.rating === '18+' && age < 20) {
      alert('성인이 아닙니다.');
      return false;
    }
    return (
      value.information.name !== '' &&
      value.information.phoneNumber !== '' &&
      value.information.securityFrontNumber !== '' &&
      value.information.securityBackNumber !== '' &&
      value.information.agree
    );
  } else if (step === BookStep.SEAT) {
    return (
      !(value.headCount.adult === 0 && value.headCount.child === 0) &&
      value.selectedSeats.length === value.headCount.adult + value.headCount.child
    );
  }
  return typeof value.payment.method !== 'undefined';
};

function BookModal({ isOpen, partners, showTimes, onClose }: Props) {
  const { isLogin, user } = useUserInfo();
  const [value, setValue] = React.useState<SelectedMovie>(initialSelectedMovieValue);
  const [state, dispatch] = React.useReducer(BookStepReducer, InitialStepValue);
  const ModalStepContent = BookStepContent[state.step];

  const onClickPrev = React.useCallback(() => dispatch({ direction: 'prev', isLogin }), [isLogin]);
  const onClickNext = React.useCallback(() => {
    if (
      isCompleteCurrentStep(
        state.step,
        value,
        Number(getAge(user?.securityNm ?? value.information.securityFrontNumber)),
      )
    ) {
      dispatch({ direction: 'next', isLogin });
    }
  }, [isLogin, state.step, user?.securityNm, value]);

  const onClickPay = React.useCallback(async () => {
    try {
      const result = await api.post('/api/ticket/reserve', {
        cardOrAccountNm: value.payment.account,
        partnerName: value.payment.partner?.name || 'none',
        paymentMethod: value.payment.method,
        price: totalPrice(value.headCount, value.showTime.theaterType),
        privateInfoDTO: {
          name: isLogin ? user?.name : value.information.name,
          phoneNm: isLogin ? user?.phoneNm : forPhoneNumber(value.information.phoneNumber),
          securityNm: isLogin
            ? user?.securityNm
            : forSecurityNumber(
                value.information.securityFrontNumber,
                value.information.securityBackNumber,
              ),
        },
        seats: value.selectedSeats.map((seat) => ({
          seatNm: seat,
          theaterId: value.showTime.theaterId,
        })),
        showtimeId: value.showTime.id,
        usedPoint: value.payment.usedPoint,
      });
      if (result.status === 200) {
        alert('영화가 성공적으로 예매되었습니다. 핸드폰으로 예매 번호를 보냈습니다.');
        dispatch({ direction: 'reset', isLogin });
        setValue(initialSelectedMovieValue);
        onClose();
      }
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      alert(data.message);
    }
  }, [
    isLogin,
    onClose,
    user?.name,
    user?.phoneNm,
    user?.securityNm,
    value.headCount,
    value.information.name,
    value.information.phoneNumber,
    value.information.securityBackNumber,
    value.information.securityFrontNumber,
    value.payment.account,
    value.payment.method,
    value.payment.partner?.name,
    value.payment.usedPoint,
    value.selectedSeats,
    value.showTime.id,
    value.showTime.theaterId,
    value.showTime.theaterType,
  ]);

  const onClickClose = React.useCallback(() => {
    dispatch({ direction: 'reset', isLogin });
    onClose();
  }, [isLogin, onClose]);

  const onReset = React.useCallback(() => {
    dispatch({ direction: 'reset', isLogin });
    setValue(initialSelectedMovieValue);
  }, [isLogin]);

  React.useEffect(() => {
    if (user) {
      setValue((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          membership: user.membership,
        },
      }));
    }
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <HStack
              position="absolute"
              left="0"
              cursor="pointer"
              alignItems="center"
              _hover={{ color: 'black', fontWeight: 800 }}
              onClick={onReset}
            >
              <Icon as={RefreshRight} />
              <Text fontSize={8} transition="all 0.2s">
                예매 다시하기
              </Text>
            </HStack>
            <Text>{state.title}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <BookContextProvider value={value} setValue={setValue}>
          <ModalBody>
            <ModalStepContent partners={partners} showTimes={showTimes} userPoint={user?.point} />
          </ModalBody>
        </BookContextProvider>
        <ModalFooter justifyContent={state.step !== BookStep.MOVIE ? 'space-between' : 'end'}>
          {state.step !== BookStep.MOVIE && (
            <Button colorScheme="gray" onClick={onClickPrev} borderRadius={0}>
              이전 단계
            </Button>
          )}
          {state.step !== BookStep.PAY ? (
            <Button colorScheme="blue" onClick={onClickNext} borderRadius={0}>
              다음 단계
            </Button>
          ) : (
            <Button colorScheme="red" onClick={onClickPay} borderRadius={0}>
              결제
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookModal;
