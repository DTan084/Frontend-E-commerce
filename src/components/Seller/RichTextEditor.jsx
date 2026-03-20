import React, { useState, useRef } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value = '', onChange, placeholder = 'Enter description...' }) => {
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef(null);

  // Format text commands
  const formatText = (command, value = null) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let newText = '';
    let newCursorPos = start;

    switch (command) {
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'italic':
        newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
        newCursorPos = end + 2;
        break;

      case 'underline':
        newText = text.substring(0, start) + `__${selectedText}__` + text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'strike':
        newText = text.substring(0, start) + `~~${selectedText}~~` + text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'heading':
        const lines = text.split('\n');
        const currentLineIndex = text.substring(0, start).split('\n').length - 1;
        lines[currentLineIndex] = `### ${lines[currentLineIndex]}`;
        newText = lines.join('\n');
        newCursorPos = start + 4;
        break;

      case 'ul':
        newText = text.substring(0, start) + `\n• ${selectedText || 'List item'}` + text.substring(end);
        newCursorPos = start + selectedText.length + 3;
        break;

      case 'ol':
        newText = text.substring(0, start) + `\n1. ${selectedText || 'List item'}` + text.substring(end);
        newCursorPos = start + selectedText.length + 4;
        break;

      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = text.substring(0, start) + `[${selectedText || 'Link text'}](${url})` + text.substring(end);
          newCursorPos = end + url.length + 4;
        } else {
          return;
        }
        break;

      case 'code':
        newText = text.substring(0, start) + `\`\`\`\n${selectedText}\n\`\`\`` + text.substring(end);
        newCursorPos = end + 8;
        break;

      case 'quote':
        newText = text.substring(0, start) + `\n> ${selectedText || 'Quote text'}` + text.substring(end);
        newCursorPos = start + selectedText.length + 3;
        break;

      default:
        return;
    }

    onChange(newText);

    // Set cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Insert template
  const insertTemplate = (template) => {
    const templates = {
      features: '\n### ✨ Key Features\n• Feature 1\n• Feature 2\n• Feature 3\n\n',
      requirements: '\n### 📋 Requirements\n• Requirement 1\n• Requirement 2\n\n',
      installation: '\n### 🚀 Installation\n1. Step 1\n2. Step 2\n3. Step 3\n\n',
      demo: '\n### 🎮 Live Demo\n[View Demo](https://example.com)\n\n',
      support: '\n### 💬 Support\nFor questions and support, please contact us.\n\n',
    };

    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const newText = text.substring(0, start) + templates[template] + text.substring(start);

    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  // Parse markdown to HTML (simple version)
  const parseMarkdown = (text) => {
    return text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>')
      .replace(/^• (.*)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*)/gm, '<li>$2</li>')
      .replace(/\n/g, '<br>');
  };

  // Character count
  const charCount = value.length;
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="rich-text-editor">
      {/* Header */}
      <div className="editor-header">
        <h3 className="editor-title">
          📝 Description <span className="required">*</span>
        </h3>
        <div className="editor-stats">
          <span className="stat-item">
            <span className="stat-icon">📊</span>
            {charCount} chars
          </span>
          <span className="stat-item">
            <span className="stat-icon">📄</span>
            {wordCount} words
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('bold')}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('italic')}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('underline')}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('strike')}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('heading')}
            title="Heading"
          >
            H
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('ul')}
            title="Bullet List"
          >
            ⋮
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('ol')}
            title="Numbered List"
          >
            1.
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('link')}
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('code')}
            title="Code Block"
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => formatText('quote')}
            title="Quote"
          >
            "
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-btn ${!isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(false)}
            title="Edit Mode"
          >
            ✏️
          </button>
          <button
            type="button"
            className={`toolbar-btn ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(true)}
            title="Preview Mode"
          >
            👁️
          </button>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="editor-templates">
        <span className="template-label">Quick Templates:</span>
        <button
          type="button"
          className="template-btn"
          onClick={() => insertTemplate('features')}
        >
          ✨ Features
        </button>
        <button
          type="button"
          className="template-btn"
          onClick={() => insertTemplate('requirements')}
        >
          📋 Requirements
        </button>
        <button
          type="button"
          className="template-btn"
          onClick={() => insertTemplate('installation')}
        >
          🚀 Installation
        </button>
        <button
          type="button"
          className="template-btn"
          onClick={() => insertTemplate('demo')}
        >
          🎮 Demo
        </button>
        <button
          type="button"
          className="template-btn"
          onClick={() => insertTemplate('support')}
        >
          💬 Support
        </button>
      </div>

      {/* Editor Area */}
      <div className="editor-content">
        {!isPreview ? (
          <textarea
            ref={editorRef}
            className="editor-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={15}
          />
        ) : (
          <div 
            className="editor-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(value) || '<p class="preview-empty">Nothing to preview yet...</p>' }}
          />
        )}
      </div>

      {/* Footer Tips */}
      <div className="editor-footer">
        <div className="footer-tip">
          💡 <strong>Tip:</strong> Use markdown formatting for better presentation. Select text and use toolbar buttons for quick formatting.
        </div>
        <div className="footer-warning">
          ⚠️ Write detailed descriptions to attract more buyers!
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
