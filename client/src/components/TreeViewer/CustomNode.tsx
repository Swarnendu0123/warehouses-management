import React, { useState } from "react";

// icons
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import TextField from "@mui/material/TextField";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { NodeModel, CustomData } from "./types";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onCopy: (id: NodeModel["id"]) => void;
  isSelected: boolean;
  onSelect: (node: NodeModel<CustomData>) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const [hover, setHover] = useState<boolean>(false);
  const { id, droppable, data, text } = props.node;
  const indent = props.depth * 24;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  const handleSelect = () => props.onSelect(props.node);

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  return (
    <div
      className={`tree-node ${styles.root} ${
        props.isSelected ? styles.isSelected : ""
      }`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleSelect}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      {!visibleInput && (
        <div className={styles.labelGridItem}>
          <Typography variant="body2">{props.node.text}</Typography>
        </div>
      )}
      {visibleInput ? (
        <div className={styles.inputWrapper}>
          <TextField
            className={`${styles.textField}
              ${styles.nodeInput}`}
            value={labelText}
            onChange={handleChangeText}
          />
          <IconButton
            className={styles.editButton}
            onClick={handleSubmit}
            disabled={labelText === ""}
          >
            <CheckIcon className={styles.editIcon} />
          </IconButton>
          <IconButton className={styles.editButton} onClick={handleCancel}>
            <CloseIcon className={styles.editIcon} />
          </IconButton>
        </div>
      ) : (
        <div>
          {hover && (
            <div className="flex">
              <div className={styles.actionButton}>
                <IconButton size="small" onClick={() => props.onDelete(id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
              <div className={styles.actionButton}>
                <IconButton size="small" onClick={() => props.onCopy(id)}>
                  <FileCopy fontSize="small" />
                </IconButton>
              </div>
              <div className={styles.actionButton}>
                <IconButton size="small" onClick={handleShowInput}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
