'use client';

import Image from 'next/image';

import CodeHeaanTitle from '@/assets/code_heaan_title.svg';
import DoneOutline from '@/assets/done_outline.svg';
import Globe from '@/assets/globe.svg';
import Lock from '@/assets/lock.svg';
import StartButton from '@/components/elements/StartButton';

const PAY_FOR_GPU_USAGE = [
  'Transparent per-minute GPU pricing',
  'Prepaid credits or global payment gateways (Stripe, Toss, …)',
  'Secure and compliant payment infrastructure',
];

const MainPage = () => {
  return (
    <div className="min-h-[2400px] text-base text-white md:text-lg">
      <div className="relative min-h-screen overflow-hidden">
        <Image
          src="/assets/bg_landing_01.jpg"
          alt="codeheaan-landing-background"
          className="blur-2xs object-cover"
          sizes="(max-width: 1280px) 100vw, 85vw"
          fill
          priority
        />
        <div className="absolute h-full w-full bg-black opacity-40" />
        <div className="absolute left-1/2 z-11 flex h-full w-full max-w-[1168px] -translate-x-1/2 flex-col gap-10 px-6">
          <h1 className="pt-20 sm:pt-36">
            <CodeHeaanTitle className="w-[80vw] fill-white sm:w-[368px]" />
          </h1>
          <h3>Code, Build, and Accelerate FHE Applications — Seamlessly in the Cloud</h3>
          <p className="text-base text-white md:text-lg">
            CODE.HEAAN is your browser-based platform for coding, building, and executing high
            performance Fully Homomorphic Encryption(FHE) applications with GPU acceleration — no
            local setup, no hardware dependency.
          </p>
          <StartButton />
          <Image
            src="/assets/code_heaan_sample.png"
            alt="codeheaan-sample"
            className="absolute top-[65%] left-[20%] hidden rounded sm:block md:top-[58%] md:left-[35%]"
            sizes="100vw"
            width={1000}
            height={533}
            priority
          />
        </div>
      </div>
      {/* One Click to Start Coding */}
      <div className="landing-container bg-[#090919]">
        <div className="landing-content flex flex-col gap-8 rounded border-4 border-[#1c3a9a] p-8 sm:gap-12 sm:p-12">
          <h3>One Click to Start Coding</h3>
          <div className="flex flex-col gap-8">
            <p className="text-base md:text-lg">
              {`You bring the ideas. \nWe bring the manual how to utilize HEaaN for realizing your idea, GPU, compiler, storage, and deployment as well.`}
            </p>
            <div className="!font-FiraCode w-full rounded bg-[#323237] p-4 text-sm md:text-lg">{`$ gpu-run your-brilliant-fhe-application`}</div>
          </div>
        </div>
      </div>
      {/* Code, Build, Run — All in the Browser */}
      <div className="landing-container bg-[#090919]">
        <div className="landing-content flex flex-col items-center gap-12">
          <h3>Code, Build, Run — All in the Browser</h3>

          <div className="flex flex-col items-center gap-2 text-white md:flex-row">
            <p className="text-base md:text-lg">
              Use high performance FHE library HEaaN™ with a single statement
            </p>
            <div className="!font-FiraCode w-fit rounded bg-[#323237] px-1 py-0.5">{`#include "HEaaN/HEaaN.hpp"`}</div>
          </div>
          <Image
            src="/assets/docker_to_codeheaan.png"
            alt="codeheaan-sample"
            className=""
            sizes="100vw"
            width={1000}
            height={483}
            priority
          />
          <p className="text-base md:text-lg">
            {`Run your projects inside a cloud container configured to your needs.\n\n- Compatible with your existing C++ toolchains\n- Code on CPU instance, offload compute to GPU on demand\n- All your files are safely stored in the cloud`}
          </p>
        </div>
      </div>
      {/* Perfect for */}
      <div className="relative overflow-hidden py-14 sm:py-[100px]">
        <Image
          src="/assets/bg_landing_02.jpg"
          alt="codeheaan-landing-background"
          className="object-cover"
          sizes="100vw"
          fill
          priority
        />
        <div className="absolute top-0 h-full w-full bg-black opacity-50" />
        <div className="landing-content relative z-11 mx-auto flex w-full flex-col items-center gap-12 px-6">
          <h3>Perfect for</h3>
          <hr className="w-full max-w-[800px] border-1 border-[#30B3E0]" />
          <p className="text-center text-lg leading-9 text-white md:text-xl">{`FHE Developers\nAI/ML Researchers\nCUDA-based Simulation Engineers\nGPU-heavy data processing tasks`}</p>
        </div>
      </div>
      {/* Built for Global Developers */}
      <div className="landing-container bg-[#090919]">
        <div className="landing-content flex flex-col items-center gap-12 rounded border-4 border-[#323237] p-8 sm:px-16 sm:py-12">
          <h3>Built for Global Developers</h3>
          <div className="flex flex-col gap-8">
            <p className="text-base md:text-lg">
              {`Whether you're in Seoul, San Francisco, or Shanghai, CODE.HEAAN adapts to your region and currency.`}
            </p>
            <ul className="grid w-full max-w-[830px] grid-rows-2 items-center gap-8 sm:grid-cols-2 sm:grid-rows-1">
              <li className="flex h-full flex-col gap-4 rounded border-2 border-[#1C3A9A] p-4">
                <Globe className="h-8 w-8 fill-[#30B3E0]" />
                <span className="text-base">
                  Stripe, PayPal, Alipay, WeChat Pay, and more for International Users
                </span>
              </li>
              <li className="flex h-full flex-col gap-4 rounded border-2 border-[#1C3A9A] p-4">
                <Lock className="h-8 w-8 fill-[#29AD32]" />
                <span className="text-base">
                  User accounts and projects are isolated and secure
                </span>
              </li>
            </ul>
          </div>
          <hr className="w-full border-2 border-[#323237]" />
          <h3>Pay for GPU Usage Only</h3>
          <div className="flex flex-col gap-8">
            <p className="text-base md:text-lg">
              {`Your coding session runs on a lightweight CPU container. Almost you have to manage is how often you request GPU execution.`}
            </p>
            <ul className="flex w-full flex-col gap-4">
              {PAY_FOR_GPU_USAGE.map((val, i) => (
                <li key={`${val}-${i}`} className="flex items-center gap-2">
                  <DoneOutline className="h-6 min-w-6 fill-[#29AD32]" />
                  <span className="text-base md:text-lg">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Start for Free */}
      <div className="w-full bg-[#090919] px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm sm:text-base">
            {`We currently offer the beta service for free, with paid plans to be introduced later.`}
          </p>
          <StartButton />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
