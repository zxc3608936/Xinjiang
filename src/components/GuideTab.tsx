import { Package, ShieldCheck, HelpCircle } from 'lucide-react';

export default function GuideTab() {
  return (
    <div className="px-6 pt-6 pb-12 flex flex-col gap-5 max-w-xl mx-auto w-full">
      <h2 className="text-xl font-bold text-[#4A4A48] flex items-center gap-2">
        <HelpCircle className="text-[var(--color-moss)]" />
        行前指南
      </h2>
      
      <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0F2ED]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <Package size={20} />
          </div>
          <h3 className="font-bold text-base text-[#4A4A48]">必備物品清單</h3>
        </div>
        <ul className="text-sm text-[#8C8C88] space-y-2 pl-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            證件：台胞證、護照、身分證 (效期六個月以上)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            衣物：洋蔥式穿搭，必備防風防雨保暖外套
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            保養：極度乾燥，高保濕乳液、護唇膏、防曬
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            藥品：個人常備藥物、腸胃藥、暈車藥
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0F2ED]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-base text-[#4A4A48]">旅遊安全須知</h3>
        </div>
        <ul className="text-sm text-[#8C8C88] space-y-2 pl-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
            <p>北疆日照長，時差約 2 小時，晚上 10 點才日落。</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
            <p>飲食多牛羊肉，重口味且少蔬菜，腸胃敏感者請留意。</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
            <p>景區區間車路程長，請隨身攜帶乾糧與飲水。</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
