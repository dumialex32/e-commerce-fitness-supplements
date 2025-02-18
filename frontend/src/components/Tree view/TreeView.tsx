import TreeItem from "./TreeItem";
import { ITreeData } from "../user/UserMenuList";
import { useState } from "react";

const TreeView: React.FC<{ data: ITreeData[] }> = ({ data }) => {
  const [activeItem, setActiveItem] = useState<string>("");

  const renderTree = (nodes: ITreeData[]) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        node={node}
        activeItem={activeItem}
        onSetActiveItem={setActiveItem}
      />
    ));
  };

  return <div>{renderTree(data)}</div>;
};

export default TreeView;
