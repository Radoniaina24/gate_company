"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Palette,
  Eye,
  Edit3,
  Highlighter,
} from "lucide-react";
import CustomColorPicker from "./ColoPicker";

type Props = {
  content: string;
  onChange: (value: string) => void;
};
export const TiptapEditor = ({ content, onChange }: Props) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // useEffect(() => {
  //   if (editor && content !== editor.getHTML()) {
  //     editor.commands.setContent(content);
  //   }
  // }, [content]);
  // Configuration Tiptap avec toutes les extensions nécessaires
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-4" },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline hover:text-blue-700 cursor-pointer",
        },
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none focus:outline-none "text-slate-800"`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // renvoie le contenu à ton parent
    },
  });

  // Fonctions pour les actions de formatage
  const handleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const handleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const handleStrike = useCallback(() => {
    editor?.chain().focus().toggleStrike().run();
  }, [editor]);

  // Fonctions pour les titres
  const handleHeading = useCallback(
    (level: any) => {
      if (level === 0) {
        editor?.chain().focus().setParagraph().run();
      } else {
        editor?.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor]
  );

  const handleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const handleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  // Fonctions pour l'alignement
  const handleTextAlign = useCallback(
    (alignmen: any) => {
      editor?.chain().focus().setTextAlign(alignmen).run();
    },
    [editor]
  );

  // Fonctions pour l'historique
  const handleUndo = useCallback(() => {
    editor?.chain().focus().undo().run();
  }, [editor]);

  const handleRedo = useCallback(() => {
    editor?.chain().focus().redo().run();
  }, [editor]);

  // Fonction pour le surlignage
  const handleHighlight = useCallback(
    (color = "#ffff00") => {
      editor?.chain().focus().toggleHighlight({ color }).run();
    },
    [editor]
  );
  const formatButtons = [
    {
      icon: Bold,
      action: handleBold,
      tooltip: "Gras (Ctrl+B)",
    },
    {
      icon: Italic,
      action: handleItalic,
      tooltip: "Italique (Ctrl+I)",
    },
    {
      icon: UnderlineIcon,
      action: handleUnderline,
      tooltip: "Souligné (Ctrl+U)",
    },
    {
      icon: Strikethrough,
      action: handleStrike,
      tooltip: "Barré",
    },
  ];

  const headingButtons = [
    {
      icon: Heading1,
      action: () => handleHeading(1),
      tooltip: "Titre 1",
    },
    {
      icon: Heading2,
      action: () => handleHeading(2),
      tooltip: "Titre 2",
    },
    {
      icon: Heading3,
      action: () => handleHeading(3),
      tooltip: "Titre 3",
    },
  ];

  const listButtons = [
    {
      icon: List,
      action: handleBulletList,
      tooltip: "Liste à puces",
    },
    {
      icon: ListOrdered,
      action: handleOrderedList,
      tooltip: "Liste numérotée",
    },
  ];

  const alignButtons = [
    {
      icon: AlignLeft,
      action: () => handleTextAlign("left"),
      tooltip: "Aligner à gauche",
    },
    {
      icon: AlignCenter,
      action: () => handleTextAlign("center"),
      tooltip: "Centrer",
    },
    {
      icon: AlignRight,
      action: () => handleTextAlign("right"),
      tooltip: "Aligner à droite",
    },
  ];

  const insertButtons = [
    {
      icon: Highlighter,
      action: () => handleHighlight(),
      tooltip: "Surligner",
    },
  ];

  const historyButtons = [
    {
      icon: Undo,
      action: handleUndo,
      tooltip: "Annuler (Ctrl+Z)",
      isDisabled: !editor?.can().undo(),
    },
    {
      icon: Redo,
      action: handleRedo,
      tooltip: "Refaire (Ctrl+Y)",
      isDisabled: !editor?.can().redo(),
    },
  ];

  if (!editor) {
    return <div>Chargement de l'éditeur...</div>;
  }

  return (
    <div className={` `}>
      <div className="">
        {/* Main Editor Container */}
        <div
          className={`rounded-2xl  overflow-hidden  bg-white border border-slate-200`}
          onClick={() => editor.commands.focus()}
        >
          {/* Toolbar */}
          <div className={`border-b border-slate-200 bg-slate-50 p-4`}>
            {/* Top toolbar row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {/* Color picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className={`p-2 rounded-lg transition-all duration-200 bg-white hover:bg-slate-100 text-slate-600 border border-gray-300`}
                  title="Couleur du texte"
                >
                  <Palette size={16} />
                </button>

                {showColorPicker && (
                  <CustomColorPicker
                    show={showColorPicker}
                    onSelectColor={(color) =>
                      editor?.chain().focus().setColor(color).run()
                    }
                    onReset={() => editor?.chain().focus().unsetColor().run()}
                    onClose={() => setShowColorPicker(false)}
                  />
                )}
              </div>

              {/* View toggle */}
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isPreviewMode
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-white hover:bg-slate-100 text-slate-600"
                } border border-slate-300`}
              >
                {isPreviewMode ? <Edit3 size={16} /> : <Eye size={16} />}
                <span className="hidden sm:inline text-sm font-medium">
                  {isPreviewMode ? "Éditer" : "Aperçu"}
                </span>
              </button>
            </div>

            {/* Formatting toolbar */}
            {!isPreviewMode && (
              <div className="space-y-3">
                {/* Text formatting */}
                <div className="flex flex-wrap items-center gap-1">
                  <div className="flex items-center gap-1 mr-4">
                    {formatButtons.map(({ icon: Icon, action, tooltip }) => (
                      <button
                        key={tooltip}
                        onClick={action}
                        className={`p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 text-slate-600 `}
                        title={tooltip}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* Headings */}
                  <div className="flex items-center gap-1 mr-4">
                    {headingButtons.map(({ icon: Icon, action, tooltip }) => (
                      <button
                        key={tooltip}
                        onClick={action}
                        className={`p-2 rounded-lg transition-all duration-200 ${"hover:bg-slate-200 text-slate-600"}`}
                        title={tooltip}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* Lists and alignment - hidden on small screens */}
                  <div className="hidden md:flex items-center gap-1 mr-4">
                    {listButtons.map(({ icon: Icon, action, tooltip }) => (
                      <button
                        key={tooltip}
                        onClick={action}
                        className={`p-2 rounded-lg transition-all duration-200  hover:bg-slate-200 text-slate-600`}
                        title={tooltip}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  <div className="hidden lg:flex items-center gap-1 mr-4">
                    {alignButtons.map(({ icon: Icon, action, tooltip }) => (
                      <button
                        key={tooltip}
                        onClick={action}
                        className={`p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 text-slate-600 `}
                        title={tooltip}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* Insert elements */}
                  <div className="hidden sm:flex items-center gap-1 mr-4">
                    {insertButtons.map(({ icon: Icon, action, tooltip }) => (
                      <button
                        key={tooltip}
                        onClick={action}
                        className={`p-2 rounded-lg transition-all duration-200  hover:bg-slate-200 text-slate-600`}
                        title={tooltip}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* History */}
                  <div className="flex items-center gap-1">
                    {historyButtons.map(
                      ({ icon: Icon, action, tooltip, isDisabled }) => (
                        <button
                          key={tooltip}
                          onClick={action}
                          disabled={isDisabled}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-slate-200 text-slate-600"
                          }`}
                          title={tooltip}
                        >
                          <Icon size={16} />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Mobile-only second row for additional tools */}
                <div className="flex md:hidden flex-wrap items-center gap-1">
                  {listButtons.map(({ icon: Icon, action, tooltip }) => (
                    <button
                      key={tooltip}
                      onClick={action}
                      className={`p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 text-slate-600 `}
                      title={tooltip}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Editor Content */}
          <div className="relative">
            {isPreviewMode ? (
              <div className={`p-6 lg:p-8 min-h-72 text-slate-800`}>
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-2">Aperçu du contenu</h2>
                  <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
                </div>
              </div>
            ) : (
              <div className="relative">
                <EditorContent
                  editor={editor}
                  className={`min-h-72 p-6 lg:p-8 bg-white`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
