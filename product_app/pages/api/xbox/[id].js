import pool from "@/lib/dbConnect";

const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  if (method === "DELETE") {
    try {
      const checkProduct = await pool.query(
        "SELECT * FROM public.sen_product WHERE id = $1",
        [id]
      );

      if (checkProduct.rows === 0) {
        return res.status(404).json({ message: "Person not found" });
      }

      const deleteProduct = await pool.query(
        "DELETE from   public.sen_product WHERE id = $1",
        [id]
      );
      res.status(200).json({ message: "Personel successfully deleted" });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
