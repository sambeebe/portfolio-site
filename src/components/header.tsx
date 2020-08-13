/** @jsx jsx */
import { Flex, jsx, useColorMode, Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import Navigation from "./navigation"
import SocialLinks from "./social-links"

type HeaderProps = {
  meta: {
    [key: string]: string
  }
  nav: {
    title: string
    slug: string
  }[]
}

const Header = ({ meta, nav }: HeaderProps) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`)
  }

  const navEmpty = nav.length === 0

  return (
    <Flex as="header" variant="layout.header">
      {!navEmpty && <Navigation nav={nav} />}
      <Flex
        sx={{

          fontSize: 3,
          flex: navEmpty ? 1 : [`1 0 100%`, 1],
          justifyContent: navEmpty ? `flex-start` : `left`,
          order: [1, 2],
          zIndex: 1,
        }}
      >
        <TLink
          aria-label={`${meta.siteTitle}, Back to homepage`}
          as={Link}
          sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
          to="/"
        >
          Sam Beebe
        </TLink>
      </Flex>

    </Flex>
  )
}
        // <SocialLinks />
export default Header
