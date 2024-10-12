import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  DragLayerMonitorProps,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { NodeModel, CustomData } from "./types";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { theme } from "./theme";
import styles from "./AddDialog.module.css";
import SampleData from "./sample_data.json";
import { useRecoilState } from "recoil";
import { currentFileState } from "../../store/atoms";

const getLastId = (treeData: NodeModel[]) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

const TreeViewer = () => {
  const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(SampleData);
  const handleDrop = (newTree: NodeModel<CustomData>[]) => setTreeData(newTree);
  const [open, setOpen] = useState<boolean>(false);
  // @ts-ignore
  const [selectedNode, setSelectedNode] = useRecoilState<NodeModel>(currentFileState);
  const handleSelect = (node: NodeModel) => setSelectedNode(node);

  const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  const handleCopy = (id: NodeModel["id"]) => {
    const lastId = getLastId(treeData);
    const targetNode = treeData.find((n) => n.id === id);
    const descendants = getDescendants(treeData, id);
    // @ts-ignore
    const partialTree = descendants.map((node: NodeModel<CustomData>) => ({
      ...node,
      id: node.id + lastId,
      parent: node.parent + lastId,
    }));

    // @ts-ignore
    setTreeData([
      ...treeData,
      {
        ...targetNode,
        // @ts-ignore
        id: targetNode.id + lastId,
      },
      ...partialTree,
    ]);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (newNode: Omit<NodeModel<CustomData>, "id">) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId,
      },
    ]);

    setOpen(false);
  };

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app + " border-gray-300 border p-5 rounded-md"}>
          <div className={styles.current}>
            <p className="font-bold">
              Current node:{" "}
              <span className={styles.currentLabel}>
                {selectedNode ? selectedNode.text : "none"}
              </span>
            </p>
          </div>
          <div>
            <Button onClick={handleOpenDialog} startIcon={<AddIcon />}>
              Add Node
            </Button>
            {open && (
              <AddDialog
                tree={treeData}
                onClose={handleCloseDialog}
                // @ts-ignore
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <Tree
            tree={treeData}
            rootId={0}
            // @ts-ignore
            render={(node: NodeModel<CustomData>, options) => (
              <CustomNode
                node={node}
                {...options}
                onDelete={handleDelete}
                isSelected={node.id === selectedNode?.id}
                onSelect={handleSelect}
                onCopy={handleCopy}
                onTextChange={handleTextChange}
              />
            )}
            dragPreviewRender={(
              monitorProps: DragLayerMonitorProps<CustomData>
            ) => <CustomDragPreview monitorProps={monitorProps} />}
            // @ts-ignore
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
};

export default TreeViewer;
