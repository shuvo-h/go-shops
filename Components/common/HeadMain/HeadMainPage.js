import Head from 'next/head';
import React from 'react';
import { default_page_head_meta_Props } from '../../../DataSetStatic/common/pageInfo';

const HeadMainPage = ({page_head_meta_info = default_page_head_meta_Props}) => {

    const {title,author, keywords = [], description, baseURL } = page_head_meta_info;

    return (
        <Head>
            <title>{title ? `${title} - ${default_page_head_meta_Props.title}` : default_page_head_meta_Props.title}</title>
            {author && <meta name="author" content={author} />}
            {keywords.length > 0 && <meta name="keyword" content= {keywords.join(", ")} />}
            {description && <meta name="description" content={description} />}
            {baseURL && <base href={baseURL}></base>}


        </Head>
    );
};

export default HeadMainPage;