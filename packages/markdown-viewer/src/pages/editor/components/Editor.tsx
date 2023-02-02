import { Card, Col, Input, Row } from 'antd';
import { default as ForEditor } from 'for-editor';
import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-Gfm';

const { TextArea } = Input;

interface PropsType {
	Content?: string;
}
interface StateType {
	content: string;
}
class Editor extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			content: props?.Content ?? ''
		};
	}
	handleChange = (value) => {
		this.setState({ content: value });
	};
	render() {
		const { content } = this.state;
		return (
			<div>
				<Row>
					<Col span={12}>
						<ForEditor value={content} onChange={this.handleChange}></ForEditor>
					</Col>
					<Col span={12}>
						<Card title="预览" style={{ width: '100%', height: '100%' }}>
							<ReactMarkdown
								components={{
									code({ node, inline, className, children, ...props }) {
										const match = /language-(\w+)/.exec(className || '');
										return !inline && match ? (
											<SyntaxHighlighter
												children={String(children).replace(/\n$/, '')}
												style={vs}
												language={match[1]}
												PreTag="div"
												showLineNumbers
												{...props}
											/>
										) : (
											<code className={className} {...props}>
												{children}
											</code>
										);
									}
								}}
								remarkPlugins={[remarkGfm]}
							>
								{content}
							</ReactMarkdown>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Editor;
