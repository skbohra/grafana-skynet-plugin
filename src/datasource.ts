import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from './types';
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  path: string;
  seed: string;
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.path = instanceSettings.jsonData.path;
    this.seed = instanceSettings.jsonData.seed;
  }

  async doRequest(query: MyQuery) {
    const client = new SkynetClient(this.path);
    const { publicKey } = genKeyPairFromSeed(this.seed);
    const dataKey = query.dataKey;
    try {
      const { data, revision } = await client.db.getJSON(publicKey, dataKey);
      console.log(data.note);
      console.log(revision);
      return data.note;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();
    const promises = options.targets.map(query =>
      this.doRequest(query).then(response => {
        const frame = new MutableDataFrame({
          refId: query.refId,
          fields: [
            { name: 'Time', type: FieldType.time, values: [from, to] },
            { name: 'Value', type: FieldType.number, values: [parseFloat(response), parseFloat(response)] },
          ],
        });

        //alert(query.constant);
        //response.data.forEach((point: any) => {
        //  frame.appendRow([point.time, response.note]);
        //});

        return frame;
      })
    );
    return Promise.all(promises).then(data => ({ data }));
  }
  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
