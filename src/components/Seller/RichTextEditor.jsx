import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Eye,
  Edit3,
  Sparkles,
  Terminal,
  FileCheck2,
} from 'lucide-react';
import './RichTextEditor.css';

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Nhập mô tả chi tiết sản phẩm, công nghệ sử dụng, cấu trúc thư mục...',
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef(null);

  const formatText = (command) => {
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
        newText =
          text.substring(0, start) +
          `**${selectedText || 'Văn bản in đậm'}**` +
          text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'italic':
        newText =
          text.substring(0, start) +
          `*${selectedText || 'Văn bản in nghiêng'}*` +
          text.substring(end);
        newCursorPos = end + 2;
        break;

      case 'underline':
        newText =
          text.substring(0, start) +
          `__${selectedText || 'Văn bản gạch chân'}__` +
          text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'strike':
        newText =
          text.substring(0, start) +
          `~~${selectedText || 'Văn bản gạch ngang'}~~` +
          text.substring(end);
        newCursorPos = end + 4;
        break;

      case 'heading':
        const lines = text.split('\n');
        const currentLineIndex = text.substring(0, start).split('\n').length - 1;
        lines[currentLineIndex] = `### ${lines[currentLineIndex] || 'Tiêu đề mục'}`;
        newText = lines.join('\n');
        newCursorPos = start + 4;
        break;

      case 'ul':
        newText =
          text.substring(0, start) + `\n• ${selectedText || 'Mục danh sách'}` + text.substring(end);
        newCursorPos = start + selectedText.length + 3;
        break;

      case 'ol':
        newText =
          text.substring(0, start) +
          `\n1. ${selectedText || 'Bước thực hiện'}` +
          text.substring(end);
        newCursorPos = start + selectedText.length + 4;
        break;

      case 'link':
        const url = prompt('Nhập đường dẫn URL:');
        if (url) {
          newText =
            text.substring(0, start) +
            `[${selectedText || 'Xem liên kết'}](${url})` +
            text.substring(end);
          newCursorPos = end + url.length + 4;
        } else {
          return;
        }
        break;

      case 'code':
        newText =
          text.substring(0, start) +
          `\`\`\`\n${selectedText || '// Code snippet ví dụ'}\n\`\`\`` +
          text.substring(end);
        newCursorPos = end + 8;
        break;

      case 'quote':
        newText =
          text.substring(0, start) +
          `\n> ${selectedText || 'Đoạn trích dẫn hoặc lưu ý'}` +
          text.substring(end);
        newCursorPos = start + selectedText.length + 3;
        break;

      default:
        return;
    }

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertTemplate = (template) => {
    const templates = {
      features:
        '\n### Tính năng nổi bật & Kiến trúc\n• Frontend: React 18, Tailwind CSS, Redux Toolkit\n• Backend: Node.js / Laravel RESTful API\n• Database: MySQL / MongoDB sạch 100%\n• Tích hợp thanh toán trực tuyến và phân quyền Admin/User\n\n',
      requirements:
        '\n### Yêu cầu môi trường cài đặt\n• Node.js version 18.x trở lên\n• PHP 8.2+ (nếu có Laravel backend) / Java 17+ (nếu Spring Boot)\n• MySQL 8.0+ hoặc PostgreSQL\n\n',
      installation:
        '\n### Hướng dẫn cài đặt nhanh (Quick Start)\n1. Giải nén file .ZIP và mở terminal tại thư mục gốc.\n2. Cấu hình file `.env` với thông tin database.\n3. Chạy lệnh `npm install` để tải dependencies.\n4. Chạy `npm run dev` để khởi chạy ứng dụng.\n\n',
      support:
        '\n### Cam kết & Hỗ trợ kỹ thuật\n• Bảo hành lỗi code 3 ngày theo cơ chế Escrow của CodeMart.\n• Hỗ trợ cấu hình qua UltraView / AnyDesk trong 24h đầu tiên.\n\n',
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

  const parseMarkdown = (text) => {
    if (!text) return '<p class="preview-empty">Chưa có nội dung mô tả để xem trước...</p>';
    return text
      .replace(/### (.*)/g, '<h4 class="md-h4">$1</h4>')
      .replace(/## (.*)/g, '<h3 class="md-h3">$1</h3>')
      .replace(/# (.*)/g, '<h2 class="md-h2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>'
      )
      .replace(/```(.*?)```/gs, '<pre class="md-code"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="md-inline-code">$1</code>')
      .replace(/^> (.*)/gm, '<blockquote class="md-quote">$1</blockquote>')
      .replace(/^• (.*)/gm, '<li class="md-li">$1</li>')
      .replace(/^(\d+)\. (.*)/gm, '<li class="md-li-num">$2</li>')
      .replace(/\n/g, '<br>');
  };

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="rich-editor-container-modern">
      {/* Editor Toolbar */}
      <div className="rich-editor-toolbar">
        <div className="toolbar-btn-group">
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('bold')}
            title="In đậm (Bold)"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('italic')}
            title="In nghiêng (Italic)"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('underline')}
            title="Gạch chân (Underline)"
          >
            <Underline size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('strike')}
            title="Gạch ngang (Strikethrough)"
          >
            <Strikethrough size={14} />
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-btn-group">
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('heading')}
            title="Tiêu đề mục (Heading 3)"
          >
            <Heading size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('ul')}
            title="Danh sách gạch đầu dòng"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('ol')}
            title="Danh sách đánh số"
          >
            <ListOrdered size={14} />
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-btn-group">
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('link')}
            title="Chèn liên kết Demo / Docs"
          >
            <LinkIcon size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('code')}
            title="Chèn khối Code"
          >
            <Code size={14} />
          </button>
          <button
            type="button"
            className="btn-toolbar-tool"
            onClick={() => formatText('quote')}
            title="Chèn trích dẫn / Lưu ý"
          >
            <Quote size={14} />
          </button>
        </div>

        {/* View Toggle */}
        <div className="toolbar-view-toggle">
          <button
            type="button"
            className={`btn-view-toggle ${!isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(false)}
          >
            <Edit3 size={13} />
            <span>Soạn thảo</span>
          </button>
          <button
            type="button"
            className={`btn-view-toggle ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(true)}
          >
            <Eye size={13} />
            <span>Xem trước</span>
          </button>
        </div>
      </div>

      {/* Quick Template Insert Chips */}
      <div className="quick-templates-strip">
        <span className="templates-label">Chèn mẫu nhanh:</span>
        <button
          type="button"
          className="btn-template-chip"
          onClick={() => insertTemplate('features')}
        >
          <Sparkles size={11} />
          <span>Tính năng nổi bật</span>
        </button>
        <button
          type="button"
          className="btn-template-chip"
          onClick={() => insertTemplate('requirements')}
        >
          <FileCheck2 size={11} />
          <span>Cấu hình yêu cầu</span>
        </button>
        <button
          type="button"
          className="btn-template-chip"
          onClick={() => insertTemplate('installation')}
        >
          <Terminal size={11} />
          <span>Hướng dẫn cài đặt</span>
        </button>
      </div>

      {/* Textarea or Preview Viewport */}
      {!isPreview ? (
        <textarea
          ref={editorRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rich-editor-textarea"
          rows={10}
        />
      ) : (
        <div
          className="rich-editor-preview-viewport"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
        />
      )}

      {/* Counter Footer */}
      <div className="rich-editor-footer">
        <span className="editor-word-count">
          {charCount} ký tự • {wordCount} từ
        </span>
        <span className="editor-markdown-hint">Hỗ trợ định dạng Markdown chuẩn</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
