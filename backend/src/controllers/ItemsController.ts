import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('tb_items').select('*');

    const serializedItems = items.map((item) => {
      return {
        cd_item: item.cd_items,
        title: item.title,
        image_url: `http://192.168.0.106:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default ItemsController;
