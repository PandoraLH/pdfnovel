import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import TableAdmin from "components/Admin/TableAdmin";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const admin = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    async function fetchNovels() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/novel/getAll`
        );
        const fetchedNovels = response.data;
        setNovels(fetchedNovels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching novels:", error);
        setLoading(false);
      }
    }
    fetchNovels();
  }, [novels]);

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress /> {/* Show CircularProgress while loading */}
        </Box>
      ) : (
        <TableAdmin novels={novels} />
      )}
    </Box>
  );
};

export default admin;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      title: "Admin",
    },
  };
}
