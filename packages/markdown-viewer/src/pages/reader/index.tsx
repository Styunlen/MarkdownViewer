import { withLocation } from '@/utils/withLocation';
import { withRouter } from '@/utils/withRouter';
import { Affix, Button, Card, Col, Empty, Row } from 'antd';
import { PrinterOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Location, NavigateFunction } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-Gfm';
import print from 'print-js';
import Catalog from './component/Catelog';
class Reader extends React.Component<
	{ location: Location; navigate: NavigateFunction },
	{ content: string }
> {
	contentRef: React.RefObject<HTMLDivElement>;
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.contentRef = React.createRef();
	}
	componentDidMount(): void {
		this.setState({ content: this.props.location.state?.content ?? '' });
	}
	handleClick() {
		this.props.navigate('/editor/index', {
			state: { content: this.state.content }
		});
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
						<Row>
							<Col offset={2} span={15}>
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
											},
											h1({ node, className, children, ...props }) {
												return (
													<h1
														style={{ fontSize: '2em', fontWeight: 'bold' }}
														className={className}
														{...props}
													>
														{children}
													</h1>
												);
											}
										}}
										remarkPlugins={[remarkGfm]}
									>
										{content}
									</ReactMarkdown>
								</div>
							</Col>
							<Col offset={1} span={5}>
								<Affix key={this.contentRef.current?.innerHTML} offsetTop={10}>
									<Card title="文章目录">
										<Catalog
											key={this.contentRef.current?.innerHTML}
											contentRef={this.contentRef.current}
										></Catalog>
									</Card>
								</Affix>
							</Col>
						</Row>
					</div>
				)}
			</div>
		);
	}
}
export default withRouter(withLocation(Reader));
