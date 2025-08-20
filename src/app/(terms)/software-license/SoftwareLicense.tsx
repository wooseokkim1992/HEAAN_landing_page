'use client';

import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Dropdown from '@/components/elements/Dropdown';
import TermsUpdatedInfo from '@/components/elements/TermsUpdatedInfo';
import { SOFTWARE_LICENSE_AGREEMENT } from '@/data/softwareLicenseAgreement';
import { TermsType } from '@/typings/commonTypes';

const SoftwareLicense = () => {
  const [selectedVersion, setSelectedVersion] = useState<TermsType>(SOFTWARE_LICENSE_AGREEMENT[0]);

  const handleTarget = (target: string) =>
    setSelectedVersion(
      SOFTWARE_LICENSE_AGREEMENT.find((val) => val.updated === target) as TermsType,
    );

  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center justify-end gap-4">
        <TermsUpdatedInfo date={selectedVersion.updated} />
        <Dropdown
          placeholder="select version"
          target={selectedVersion.updated}
          handleTarget={handleTarget}
          optionArr={SOFTWARE_LICENSE_AGREEMENT.map((val) => val.updated)}
        />
      </div>
      <div className="flex w-fit max-w-[896px] flex-col gap-8">
        <h2 className="self-center font-bold">{selectedVersion.title}</h2>
        <article className="text-text01">
          <Markdown remarkPlugins={[remarkGfm]}>{selectedVersion.content}</Markdown>
        </article>
      </div>
    </div>
  );
};

export default SoftwareLicense;
