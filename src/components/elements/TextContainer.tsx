import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TextContainerProps {
  title: string;
  content: string;
}

const TextContainer = ({ title, content }: TextContainerProps) => {
  return (
    <div className="bg-bg00 border-text04 text-text01 scrollbar-thin flex h-[270px] w-full flex-col gap-4 overflow-y-auto rounded border p-4">
      <h3 className="self-center text-base text-text01 font-medium md:text-lg">{title}</h3>
      <article>
        <Markdown remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </article>
    </div>
  );
};

export default TextContainer;
