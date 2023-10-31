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
  } else if (method === "PUT") {
    try {
      const { title, description, ids, price, category, img_url } = req.body;
      const updatedProduct = await pool.query(
        "UPDATE public.sen_product SET title=$1, description=$2, price=$3, img_url=$4, category=$5 WHERE id = $6;",
        [title, description, price, img_url, category, ids]
      );
      res.status(200).json({ message: "Ürün başarıyla güncellendi" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Ürün güncellenemedi" });
    }
  }
};

export default handler;
