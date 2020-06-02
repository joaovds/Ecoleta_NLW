import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {
  async show(req: Request, res: Response) {
    try {
      const { cd_points } = req.params;

      const point = await knex('tb_points')
        .where('cd_points', cd_points)
        .first();

      if (!point) {
        return res.status(400).json({ message: 'Point not found.' });
      }

      const items = await knex('tb_items')
        .join(
          'tb_points_items',
          'tb_items.cd_items',
          '=',
          'tb_points_items.id_items'
        )
        .where('tb_points_items.id_points', cd_points)
        .select('tb_items.title');

      return res.json({ point, items });
    } catch (error) {
      return res.send(error);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { city, uf, items } = req.query;

      const parsedItems = String(items)
        .split(',')
        .map((item) => Number(item.trim()));

      const points = await knex('tb_points')
        .join(
          'tb_points_items',
          'tb_points.cd_points',
          '=',
          'tb_points_items.id_points'
        )
        .whereIn('tb_points_items.id_items', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('tb_points.*');

      return res.send(points);
    } catch (error) {
      return res.send(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
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

      const trx = await knex.transaction();

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

      const insertPoints = await trx('tb_points').insert(point);

      const pointItems = items.map((id_items: Number) => {
        return {
          id_points: insertPoints[0],
          id_items,
        };
      });

      await trx('tb_points_items').insert(pointItems);

      await trx.commit();

      return res.json({
        id: insertPoints[0],
        ...point,
      });
    } catch (error) {
      return res.send(error);
    }
  }
}

export default PointController;
