import { withLocation } from '@/utils/withLocation';
import { Empty } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Location } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-Gfm';
class Reader extends React.Component<
	{ location: Location },
	{ content: string }
> {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
	}
	params;
	componentDidMount(): void {
		this.setState({ content: this.props.location.state?.content ?? '' });
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
				)}
			</div>
		);
	}
}
export default withLocation(Reader);
