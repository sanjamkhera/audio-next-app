"use client"
const FeatureList = () => {
  return (
    <div className="w-full flex justify-center items-start bg-black">

      <div className="w-[90%] flex flex-col items-start justify-between text-white mt-[32px] mb-[20px] ">

        <div className="font-medium xm:pb-[22px] pb-[16px] whitespace-nowrap">
          <span className="text-[22px] xs:text-[18px] leading-[1.2] ">*24 hour delivery</span> <span className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px]">(usually less),</span>
          <div className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px] pt-[2px]">or money back guaranteed</div>
        </div>

        <hr className="border-t border-white border-opacity-25 w-full" />

        <div className="font-medium xm:py-[22px] py-[16px] whitespace-nowrap">
          <span className="text-[22px] xs:text-[18px] leading-[1.2] ">3-5 high-fidelity screens</span> <span className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px]">(max),</span>
          <div className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px] pt-[2px]">plus 1 round of revisions</div>
        </div>

        <hr className="border-t border-white border-opacity-25 w-full" />

        <div className="font-medium xm:py-[22px] py-[16px] whitespace-nowrap">
          <span className="text-[22px] xs:text-[18px] leading-[1.2] ">100% confidentiality -</span> <span className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px]">NDA</span>
          <div className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px] pt-[2px]">included as part of the contract</div>
        </div>

        <hr className="border-t border-white border-opacity-25 w-full" />

        <div className="font-medium xm:py-[22px] py-[16px] whitespace-nowrap">
          <span className="text-[22px] xs:text-[18px] text-white text-opacity-60 leading-[1.2] ">Interactive,</span> <span className="text-white  leading-[1.2]  text-[22px] xs:text-[18px]">clickable Figma</span>
          <div className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px] pt-[2px]"> <span className="text-white leading-[1.2]  text-[22px] xs:text-[18px]" >prototypes</span>  + artboard access</div>
        </div>

        <hr className="border-t border-white border-opacity-25 w-full" />

        <div className="font-medium xm:py-[22px] py-[16px] whitespace-nowrap">
          <span className="text-[22px] xs:text-[18px] leading-[1.2] ">Full-rights</span> <span className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px]">to all digital designs,</span>
          <div className="text-white text-opacity-60 leading-[1.2]  text-[22px] xs:text-[18px] pt-[2px]">fonts and assets</div>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />

        <div className="font-medium py-[18px] xs:py-[14px] whitespace-nowrap">
          <span className="italic text-[15px] xs:text-[13px] leading-[1.5] ">Coming soon:</span> <span className="text-white text-opacity-45 leading-[1.2]  text-[15px] xs:text-[13px]">Code export, animations, project </span>
          <div className="text-white text-opacity-45 leading-[1.5]  text-[15px] xs:text-[13px]">history, client dashboard, downloads & more</div>
        </div>
      </div>

    </div>
  );
};

export default FeatureList;