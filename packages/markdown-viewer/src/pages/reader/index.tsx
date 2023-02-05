import { withLocation } from '@/utils/withLocation';
import { withRouter } from '@/utils/withRouter';
import { Affix, Button, Card, Col, Empty, FloatButton, Row } from 'antd';
import { PrinterOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Location, NavigateFunction } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-Gfm';
import print from 'print-js';
import Catalog from './component/Catelog';
import './reader.css';
import { pathResolve } from '@/router/hooks';
class Reader extends React.Component<
	{ location: Location; navigate: NavigateFunction },
	{ content: string }
> {
	contentRef: React.RefObject<HTMLDivElement>;
	constructor(props) {
		super(props);
		this.state = {
			/* 
				这里需要使用一个空格作为content的初始值, 
				如果为空字符串, 则Catlog组件不会随着content刷新 
			*/
			content: ' '
		};
		this.handleClick = this.handleClick.bind(this);
		this.contentRef = React.createRef();
	}
	componentDidMount(): void {
		this.setState({ content: this.props.location.state?.content ?? '' });
	}
	handleClick() {
		this.props.navigate(pathResolve('/editor/index'), {
			state: { content: this.state.content }
		});
	}
	handleToTop() {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
	render(): React.ReactNode {
		const { content } = this.state;
		return (
			<div>
				{content.length == 0 ? (
					<Empty description="无内容">
						<Link to={'/editor/index'}>返回编辑器</Link>
					</Empty>
				) : (
					<div>
						<Button
							type="primary"
							style={{ marginBottom: 20, marginRight: 20 }}
							onClick={this.handleClick}
						>
							<EditOutlined />
							返回编辑
						</Button>
						<Button
							type="default"
							onClick={print.bind(this, {
								printable: 'pageContent',
								type: 'html'
							})}
						>
							<PrinterOutlined />
							打印
						</Button>
						<Row gutter={20}>
							<Col offset={2} span={16}>
								<div
									className="pageContent"
									id="pageContent"
									ref={this.contentRef}
								>
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
								</div>
							</Col>
							<Col span={6}>
								<Affix key={content} offsetTop={10}>
									<Card title="文章目录">
										<Catalog contentRef={this.contentRef.current}></Catalog>
									</Card>
								</Affix>
								<FloatButton
									icon={<UpOutlined />}
									type="primary"
									shape="square"
									tooltip="回到顶部"
									onClick={this.handleToTop}
								/>
							</Col>
						</Row>
					</div>
				)}
			</div>
		);
	}
}
export default withRouter(withLocation(Reader));
