import Head from 'next/head';
import React from 'react';
import { default_page_head_meta_Props } from '../../../DataSetStatic/common/pageInfo';

const sampleOgInfoObj = {
    pageURL:"",
    pageType:"",
    pageImgURL:"",
    pageTitle:"",
    pageDescription:""
}

const HeadMainPage = ({page_head_meta_info = default_page_head_meta_Props,ogInfo}) => {

    const {title,author, keywords = [], description, baseURL } = page_head_meta_info;

    return (
        <Head>
            {/* basic meta info  */}
            <title>{title ? `${title} - ${default_page_head_meta_Props.title}` : default_page_head_meta_Props.title}</title>
            {author && <meta name="author" content={author} />}
            {keywords.length > 0 && <meta name="keyword" content= {keywords.join(", ")} />}
            {description && <meta name="description" content={description} />}
            {baseURL && <base href={baseURL}></base>}


                {/* facebook social post share meta info  */}
            {ogInfo?.pageURL && <meta property="og:url"                content={`${ogInfo.pageURL}`} />}
            {ogInfo?.pageType && <meta property="og:type"                content={`${ogInfo.pageType}`} />}
            {ogInfo?.pageImgURL && <meta property="og:image"                content={`${ogInfo.pageImgURL}`} />}
            {ogInfo?.pageTitle && <meta property="og:title"                content={`${ogInfo.pageTitle}`} />}
            {ogInfo?.pageDescription && <meta property="og:description"                content={`${ogInfo.pageDescription}`} />}
            
        </Head>
    );
};

export default HeadMainPage;