import pool from "@/lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const getProduct = await pool.query(`SELECT * FROM public.sen_product;`);

      res.status(200).json({
        products: getProduct.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, price, category,img_url,id } = req.body;
      const postProduct = await pool.query(
        "INSERT INTO public.sen_product(title,description,price,img_url,category,id) VALUES ($1,$2,$3,$4,$5,$6)",
        [title, description, price,id, category,img_url]
      );
      res.status(200).json({ message: "Veri gönderme işlemi başarılı." });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Veri gönderme işlemi başarısız tekrar deneyin." });
    }
  }
};

export default handler
