import { withRouter } from '@/utils/withRouter';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { Card, Col, Modal, Row } from 'antd';
import { default as ForEditor } from 'for-editor';
import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavigateFunction } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-Gfm';
interface PropsType {
	Content?: string;
	navigate: NavigateFunction;
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
		this.gotoReader = this.gotoReader.bind(this);
	}
	handleChange = (value) => {
		this.setState({ content: value });
	};
	handleSave = (value) => {
		this.setState({ content: value });
		const { confirm } = Modal;
		confirm({
			title: '询问',
			icon: <InfoCircleTwoTone />,
			content: '保存完毕,是否需要进入文档阅读页',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				this.gotoReader();
			}, // 箭头函数绑定本地this
			onCancel() {
				console.log('Cancel');
			}
		});
	};
	gotoReader() {
		this.props.navigate('/reader/index', {
			state: { content: this.state.content }
		});
	}
	render() {
		const { content } = this.state;
		return (
			<div>
				<Row>
					<Col span={12}>
						<ForEditor
							value={content}
							onChange={this.handleChange}
							toolbar={{
								h1: true, // h1
								h2: true, // h2
								h3: true, // h3
								h4: true, // h4
								img: true, // 图片
								link: true, // 链接
								code: true, // 代码块
								preview: false, // 预览
								expand: true, // 全屏
								/* v0.0.9 */
								undo: true, // 撤销
								redo: true, // 重做
								save: true, // 保存
								/* v0.2.3 */
								subfield: false // 单双栏模式
							}}
							onSave={this.handleSave}
						></ForEditor>
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
export default withRouter(Editor);
