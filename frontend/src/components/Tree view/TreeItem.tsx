import React, { useState } from "react";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { ITreeData } from "../user/UserMenuList";

const TreeItem: React.FC<{
  node: ITreeData;
  activeItem: string;
  onSetActiveItem: React.Dispatch<React.SetStateAction<string>>;
}> = ({ node, activeItem, onSetActiveItem }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const nodeHasChildren = node.children && node.children.length > 0;

  const handleTreeExpand = (e: React.MouseEvent) => {
    console.log("dd");
    e.stopPropagation();
    setIsExpanded((prevState) => !prevState);
    onSetActiveItem(node.id);
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer whitespace-nowrap"
        onClick={handleTreeExpand}
      >
        <div
          className={`flex items-center hover:bg-slate-100 rounded-md px-1 py-0.5 cursor-pointer whitespace-nowrap ${
            activeItem === node.id && "bg-slate-100"
          }`}
        >
          {node.label}
          {nodeHasChildren &&
            (isExpanded ? <MdArrowDropDown /> : <MdArrowRight />)}
        </div>
      </div>

      <div className="ml-6">
        {nodeHasChildren &&
          isExpanded &&
          node.children?.map((childNode) => (
            <TreeItem
              key={childNode.id}
              node={childNode}
              activeItem={activeItem}
              onSetActiveItem={onSetActiveItem}
            />
          ))}
      </div>
    </div>
  );
};

export default TreeItem;
