"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/elements/Button";
import Checkbox from "@/components/elements/Checkbox";
import TextContainer from "@/components/elements/TextContainer";
import {
  BTN_TEXT,
  PATH_LIST,
  SESSION_STORAGE_VAL,
  TERMS_TEXT,
} from "@/constants/commonConstants";
import { PRIVACY_POLICY } from "@/data/privacyPolicy";
import { SOFTWARE_LICENSE_AGREEMENT } from "@/data/softwareLicenseAgreement";
import { TERMS_OF_SERVICE } from "@/data/termsOfService";
import { setSessionStorage } from "@/utilities/sessionStorage";

const TermsAndConditions = () => {
  const [checked, setChecked] = useState({
    termsOfService: false,
    privacyPolicy: false,
    softwareLicense: false,
    adult: false,
    betaService: false,
  });

  const router = useRouter();

  const isValid =
    checked.termsOfService &&
    checked.privacyPolicy &&
    checked.softwareLicense &&
    checked.adult &&
    checked.betaService;

  const handleAgreeToAll = () =>
    isValid
      ? setChecked({
          termsOfService: false,
          privacyPolicy: false,
          softwareLicense: false,
          adult: false,
          betaService: false,
        })
      : setChecked({
          termsOfService: true,
          privacyPolicy: true,
          softwareLicense: true,
          adult: true,
          betaService: true,
        });

  const handleNext = () => {
    setSessionStorage(
      SESSION_STORAGE_VAL.required,
      isValid ? SESSION_STORAGE_VAL.true : SESSION_STORAGE_VAL.false,
    );
    router.push(PATH_LIST.signUp);
  };

  return (
    <div className="flex w-fit max-w-[896px] flex-col gap-9 md:gap-12">
      <h2 className="self-center">Terms and Conditions</h2>
      <div className="flex flex-col gap-6 md:gap-8">
        <Checkbox
          checkboxText={TERMS_TEXT.agreeToAll}
          checked={
            checked.termsOfService &&
            checked.privacyPolicy &&
            checked.softwareLicense
          }
          handleChecked={handleAgreeToAll}
        />
        <div className="flex flex-col gap-4">
          <Checkbox
            checkboxText={TERMS_TEXT.agree}
            checked={checked.termsOfService}
            handleChecked={() =>
              setChecked((prev) => ({
                ...prev,
                termsOfService: !prev.termsOfService,
              }))
            }
          />
          <TextContainer
            title={TERMS_OF_SERVICE[0].title}
            content={TERMS_OF_SERVICE[0].content}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox
            checkboxText={TERMS_TEXT.agree}
            checked={checked.privacyPolicy}
            handleChecked={() =>
              setChecked((prev) => ({
                ...prev,
                privacyPolicy: !prev.privacyPolicy,
              }))
            }
          />
          <TextContainer
            title={PRIVACY_POLICY[0].title}
            content={PRIVACY_POLICY[0].content}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox
            checkboxText={TERMS_TEXT.agree}
            checked={checked.softwareLicense}
            handleChecked={() =>
              setChecked((prev) => ({
                ...prev,
                softwareLicense: !prev.softwareLicense,
              }))
            }
          />
          <TextContainer
            title={SOFTWARE_LICENSE_AGREEMENT[0].title}
            content={SOFTWARE_LICENSE_AGREEMENT[0].content}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox
            checkboxText={TERMS_TEXT.adult}
            checked={checked.adult}
            handleChecked={() =>
              setChecked((prev) => ({
                ...prev,
                adult: !prev.adult,
              }))
            }
          />
          <Checkbox
            checkboxText={TERMS_TEXT.betaService}
            checked={checked.betaService}
            handleChecked={() =>
              setChecked((prev) => ({
                ...prev,
                betaService: !prev.betaService,
              }))
            }
            isEmphasized={true}
          />
        </div>
      </div>
      <div className="flex w-full max-w-[632px] items-center gap-8 self-center">
        <Button
          btnText={BTN_TEXT.cancel}
          btnSize="lg"
          btnColor="blue03Outline"
          isLink={true}
          targetLink={PATH_LIST.signIn}
        />
        <Button
          btnText={BTN_TEXT.next}
          btnSize="lg"
          btnColor={isValid ? "blue01Filled" : "disabled"}
          handleClick={handleNext}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
