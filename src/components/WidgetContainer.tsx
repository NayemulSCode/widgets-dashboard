import { Widget } from "@/types";
import { X } from "lucide-react";
import { FC, ReactNode } from "react";

type Props = {
  widget: Widget;
  children: ReactNode;
};
const WidgetContainer: FC<Props> = ({ widget, children }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">{widget.title}</h2>
        </div>
        <button>
          <X size={20} />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WidgetContainer;
