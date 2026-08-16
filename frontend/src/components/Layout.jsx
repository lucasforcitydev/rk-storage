import { Container } from "@mui/material";

export default function Layout({ children }) {
    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 5,
                mb: 5,
            }}
        >
            {children}
        </Container>
    );
}