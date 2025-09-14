import { EditorContent, useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
	content: JSONContent; // Solo usamos JSONContent
}

export const ProductDescription = ({ content }: Props) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editable: false,
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose-base max-w-none',
			},
		},
	});

	if (!editor) return null; // Evita renderizado antes de inicializar

	return (
		<div className='mt-12'>
			<h2 className='text-2xl font-bold text-center mb-8 underline'>
				Descripción
			</h2>
			<EditorContent editor={editor} />
		</div>
	);
};
