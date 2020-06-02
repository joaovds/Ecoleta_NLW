import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {
  async index(req: Request, res: Response) {
    const { cd_points } = req.params;

    const point = await knex('tb_points').where('cd_points', cd_points).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found.' });
    }
    return res.json(point);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const point = {
      image: 'teste',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertPoints = await knex('tb_points').insert(point);

    const pointItems = items.map((id_items: Number) => {
      return {
        id_points: insertPoints[0],
        id_items,
      };
    });

    await knex('tb_points_items').insert(pointItems);

    return res.json({
      id: insertPoints[0],
      ...point,
    });
  }
}

export default PointController;
