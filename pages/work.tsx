import { Box, Text } from "@chakra-ui/react"
import React from "react"

export default function Work() {
  return (
    <Box p={4} bg="gray.900" minH="100vh" color="white">
      <Box pt={40}>
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          Amazing things coming soon
        </Text>
      </Box>
    </Box>
  )
}
