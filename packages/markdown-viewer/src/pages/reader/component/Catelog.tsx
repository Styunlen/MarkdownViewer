/**
 * @forked from {https://github.com/KELEN/katelog}
 * @author @Styunlen
 */
import { Alert, Anchor } from 'antd';
import { useEffect, useState } from 'react';

// TODO: need refactor
const Catalog: React.FC<{ contentRef: HTMLElement }> = function (props) {
	const defaultProps = {
		selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		active: null // 激活时候回调
	};
	const option = Object.assign({}, defaultProps, props);
	let $content = option.contentRef;
	const [allCatalogs, setAllCatalogs] = useState<Array<Element>>([]);
	const [tree, setTree] = useState([]);

	useEffect(() => {
		$content = props.contentRef;
		const cataLogs =
			$content &&
			Array.from($content?.querySelectorAll(option.selector.join()));
		setAllCatalogs(cataLogs);
	}, [props.contentRef]);

	useEffect(() => {
		const tree = getCatalogsTree(allCatalogs);
		setTree(tree);
	}, [allCatalogs]);
	/**
	 * 获取目录一维数组
	 * @param Catalogs
	 */
	function getCatalogsArray(Catalogs) {
		const tree = [];
		let lastTreeItem = null;

		for (let i = 0; i < Catalogs.length; i++) {
			const current = Catalogs[i];
			const title = current.innerText || current.textContent;
			const tagName = current.tagName;
			const id = 'heading-' + i;
			current.id = id;
			const treeItem = {
				href: `#${id}`,
				title,
				key: i.toString(),
				tagName,
				parent: { key: -1 }
			};
			if (lastTreeItem) {
				if (getPriority(treeItem.tagName) < getPriority(lastTreeItem.tagName)) {
					treeItem.parent = lastTreeItem;
				} else {
					treeItem.parent = findParent(treeItem, lastTreeItem);
				}
			}
			lastTreeItem = treeItem;
			tree.push(treeItem);
		}
		return tree;
	}

	/**
	 * 将目录一维数组转为树
	 * @param Catalogs
	 */
	function getCatalogsTree(Catalogs) {
		if (!Catalogs) {
			return [];
		}
		const CatalogsArr = getCatalogsArray(Catalogs);
		const treeList: Array<any> = [];
		const hashmap: any = {};
		CatalogsArr.forEach((item) => {
			item.children = [];
			hashmap[item.key] = item;
		});
		CatalogsArr.forEach((item) => {
			const parent = hashmap[item.parent.key];
			delete item.tagName;
			delete item.parent;
			if (parent) {
				parent.children.push(item);
			} else {
				treeList.push(item);
			}
		});
		return treeList;
	}

	/**
	 * 找到当前节点的父级
	 * @param currTreeItem
	 * @param lastTreeItem
	 * @returns {*|Window}
	 */
	function findParent(currTreeItem, lastTreeItem) {
		let lastTreeParent = lastTreeItem.parent;
		while (
			lastTreeParent &&
			getPriority(currTreeItem.tagName) >= getPriority(lastTreeParent.tagName)
		) {
			lastTreeParent = lastTreeParent.parent;
		}
		return lastTreeParent || { key: -1 };
	}

	/**
	 *  获取权重
	 */
	function getPriority(tagName) {
		let priority = 0;
		if (tagName) {
			switch (tagName.toLowerCase()) {
				case 'h1':
					priority = 6;
					break;
				case 'h2':
					priority = 5;
					break;
				case 'h3':
					priority = 4;
					break;
				case 'h4':
					priority = 3;
					break;
				case 'h5':
					priority = 2;
					break;
				case 'h6':
					priority = 1;
					break;
			}
		}
		return priority;
	}

	return (
		<div key={tree.length}>
			{tree.length != 0 && (
				<Anchor affix={false} showInkInFixed items={tree}></Anchor>
			)}
			{tree.length == 0 && <Alert description="文章木得目录" showIcon></Alert>}
		</div>
	);
};
export default Catalog;
