/** @jsx jsx */
import { animated, useSpring, config } from "react-spring"
import { Container, jsx, Flex, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import SEO from "./seo"
import { ChildImageSharp } from "../types"
import Hero from "./hero"
import ProjectInfo from "./project-info"

type ProjectProps = {
  data: {
    project: {
      body: string
      excerpt: string
      client: string
      color: string
      date: string
      service: string
      slug: string
      title: string
      cover: ChildImageSharp
    }
  }
}

const Project = ({ data: { project } }: ProjectProps) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Layout>

      <Container>
        <animated.div style={contentProps}>
          <MDXRenderer>{project.body}</MDXRenderer>
        </animated.div>
      </Container>
    </Layout>
  )
}

export default Project
