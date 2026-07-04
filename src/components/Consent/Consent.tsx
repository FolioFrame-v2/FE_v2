import React, { useState } from "react";
import { Check } from "lucide-react";
import { useGetTerms } from "@/api/generated/auth-api/auth-api";

const FormComponent = ({ onAgree, onDisagree, checkStates, setCheckStates, agree, type = "recruiter" }: any) => {
  const allChecked = Object.values(checkStates).every((isChecked) => isChecked);

  const handleCheckboxChange = (key: any) => {
    setCheckStates((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllCheck = () => {
    const newValue = !allChecked;
    const newState = Object.keys(checkStates).reduce((acc: any, key) => {
      acc[key] = newValue;
      return acc;
    }, {});
    setCheckStates(newState);
  };

  const handleAgreeClick = (e: any) => {
    e.preventDefault();
    if (allChecked) {
      onAgree(true);
    }
  };

  const handleDisagreeClick = (e: any) => {
    e.preventDefault();
    onDisagree(false);
  };

  const { data: privacyData } = useGetTerms("privacy");
  const { data: noMisuseData } = useGetTerms("no_misuse");
  const { data: penaltyData } = useGetTerms("penalty");

  return (
    <div className="flex flex-col w-full text-left">
      <div className="mb-6 border-b border-line pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-ink">가입 기본 약관</h2>
        <label className="flex items-center gap-2 cursor-pointer group">
          <span className="text-sm font-medium text-primary">전체 동의하기</span>
          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${allChecked ? 'bg-primary border-primary' : 'border-line group-hover:border-primary/50'}`}>
            {allChecked && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
          </div>
          <input type="checkbox" className="hidden" checked={allChecked} onChange={handleAllCheck} />
        </label>
      </div>

      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Section 1 */}
        <section className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <h3 className="font-semibold text-ink">1. {privacyData?.data?.result?.title || "개인정보 보호 동의"} <span className="text-coral text-xs ml-1">(필수)</span></h3>
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${checkStates.privacy ? 'bg-primary border-primary' : 'border-line group-hover:border-primary/50'}`}>
              {checkStates.privacy && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
            </div>
            <input type="checkbox" className="hidden" checked={checkStates.privacy} onChange={() => handleCheckboxChange('privacy')} />
          </label>
          <div className="p-4 bg-surface rounded-xl text-sm text-ink-soft leading-relaxed whitespace-pre-line border border-line/50">
            {privacyData?.data?.result?.content || (type === "recruiter" ? `1.1 개인정보 사용 제한\n기업회원은 열람한 일반회원의 개인정보를 본 약관에 명시된 목적(채용 평가, 입사 지원 등) 외의 용도로 사용하거나 제3자에게 제공할 수 없습니다.\n\n1.2 비밀 유지\n기업회원은 일반회원의 개인정보를 철저히 보호해야 하며, 외부 유출 방지에 만전을 기해야 합니다.` : `1.1 개인정보 수집 및 이용\nFolioFrame은 회원가입 및 포트폴리오 서비스 제공을 위해 최소한의 개인정보를 수집하며, 이용자의 사전 동의 없이 제3자에게 제공하지 않습니다.\n\n1.2 개인정보 보호\n회원의 개인정보는 안전하게 보호되며, 언제든지 열람 및 수정, 파기를 요청할 수 있습니다.`)}
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <h3 className="font-semibold text-ink">2. {noMisuseData?.data?.result?.title || (type === "recruiter" ? "포트폴리오 무단 사용 금지 동의" : "서비스 이용 및 포트폴리오 공개 동의")} <span className="text-coral text-xs ml-1">(필수)</span></h3>
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${checkStates.portfolio ? 'bg-primary border-primary' : 'border-line group-hover:border-primary/50'}`}>
              {checkStates.portfolio && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
            </div>
            <input type="checkbox" className="hidden" checked={checkStates.portfolio} onChange={() => handleCheckboxChange('portfolio')} />
          </label>
          <div className="p-4 bg-surface rounded-xl text-sm text-ink-soft leading-relaxed whitespace-pre-line border border-line/50">
            {noMisuseData?.data?.result?.content || (type === "recruiter" ? `2.1 저작권 보호\n기업회원은 일반회원의 포트폴리오에 포함된 모든 자료에 대한 저작권이 일반회원에게 있음을 인정합니다. 사전 동의 없이 복제, 배포, 게시를 금합니다.\n\n2.2 무단 사용 시 책임\n위반 시 모든 법적 책임은 기업회원에게 있으며, 법적 조치를 취할 수 있습니다.` : `2.1 포트폴리오 저작권\n회원이 작성한 포트폴리오 내용에 대한 저작권 및 책임은 회원 본인에게 있습니다. 도용 시 제재 대상이 될 수 있습니다.\n\n2.2 공개 및 노출 동의\n포트폴리오를 공개 상태로 설정 시 기업회원에게 노출되어 채용 제안을 받을 수 있음에 동의합니다.`)}
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <h3 className="font-semibold text-ink">3. {penaltyData?.data?.result?.title || "위반 시 제재 및 손해배상"} <span className="text-coral text-xs ml-1">(필수)</span></h3>
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${checkStates.violation ? 'bg-primary border-primary' : 'border-line group-hover:border-primary/50'}`}>
              {checkStates.violation && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
            </div>
            <input type="checkbox" className="hidden" checked={checkStates.violation} onChange={() => handleCheckboxChange('violation')} />
          </label>
          <div className="p-4 bg-surface rounded-xl text-sm text-ink-soft leading-relaxed whitespace-pre-line border border-line/50">
            {penaltyData?.data?.result?.content || (type === "recruiter" ? `3.1 계정 제재\n본 약관을 위반할 경우, 기업회원의 계정이 일시 정지 또는 영구적으로 제한될 수 있습니다.\n\n3.2 손해배상 책임\n기업회원의 위반 행위로 인해 발생한 피해에 대해 모든 손해배상 책임을 집니다.` : `3.1 계정 제재\n서비스 정상 운영을 방해하거나 타인에게 피해를 주는 행위가 적발될 경우 서비스 이용이 제한될 수 있습니다.\n\n3.2 책임의 한계\nFolioFrame은 채용 과정에서 발생하는 분쟁이나 결과에 대해 법적 책임을 지지 않습니다.`)}
          </div>
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <button className="flex-1 h-12 rounded-xl font-medium text-ink bg-surface hover:bg-line/50 transition-colors" onClick={handleDisagreeClick}>
          닫기
        </button>
        <button className={`flex-1 h-12 rounded-xl font-medium transition-colors ${!allChecked ? 'bg-line text-ink-soft cursor-not-allowed' : 'bg-primary text-primary-foreground hover:opacity-90'}`} disabled={!allChecked} onClick={handleAgreeClick}>
          모두 동의하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default FormComponent;