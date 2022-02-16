import { graphql } from "gatsby";
import "katex/dist/katex.min.css";
import React, { useEffect } from "react";
import { Bio } from "../components/bio";
import { Disqus } from "../components/disqus";
import * as Elements from "../components/elements";
import Head from "../components/head";
import { PostContainer } from "../components/post-container";
import { PostDate } from "../components/post-date";
import { PostNavigator } from "../components/post-navigator";
import { PostTitle } from "../components/post-title";
import { SocialShare } from "../components/social-share";
import { Utterances } from "../components/utterances";
import { Layout } from "../layout";
import "../styles/code.scss";
import * as ScrollManager from "../utils/scroll";

const BlogPost = ({ data, pageContext, location }) => {
  useEffect(() => {
    ScrollManager.init();
    return () => ScrollManager.destroy();
  }, []);

  const post = data.markdownRemark;
  const metaData = data.site.siteMetadata;
  const { title, comment, siteUrl, author } = metaData;
  const { disqusShortName, utterances } = comment;
  const { title: postTitle, date } = post.frontmatter;

  return (
    <Layout location={location} title={title}>
      <Head title={postTitle} description={post.excerpt} />
      <PostTitle title={postTitle} />
      <PostDate date={date} />
      <PostContainer html={post.html} />
      <SocialShare title={postTitle} author={author} />
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      {!!disqusShortName && (
        <Disqus
          post={post}
          shortName={disqusShortName}
          siteUrl={siteUrl}
          slug={pageContext.slug}
        />
      )}
      {!!utterances && <Utterances repo={utterances} />}
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default BlogPost;
