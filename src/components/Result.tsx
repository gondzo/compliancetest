import * as React from 'react';
import * as R from 'ramda';
import { RuleResult, RuleResultItem } from '@src/types';
import { Table, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import downloadCsv from 'download-csv';

interface ResultProps extends RuleResult {}

type State = {
  filter?: string;
  sortBy: string;
  sortOrder: number;
};

type Column = {
  value: keyof RuleResultItem;
  text: string;
};

class Result extends React.Component<ResultProps, State> {
  state = {
    filter: '',
    sortBy: 'name',
    sortOrder: 1,
  };

  sort = (column: string) => {
    const { sortBy, sortOrder } = this.state;

    if (sortBy === column) {
      this.setState({ sortOrder: -sortOrder });
    } else {
      this.setState({ sortBy: column, sortOrder: -1 });
    }
  }

  render() {
    const { friendlyName, items } = this.props;
    const { sortBy, sortOrder, filter } = this.state;
    const columns: Column[] = [
      { value: 'name', text: 'Name' },
      { value: 'ownerEmail', text: 'Owner Email' },
    ];

    const filterItems = R.pipe<
      RuleResultItem[],
      RuleResultItem[],
      RuleResultItem[],
      RuleResultItem[]
    >(
      R.filter((item: RuleResultItem) => {
        if (!filter) {
          return true;
        }
        return columns.some(col => {
          const val = item[col.value] || '';
          return val.indexOf(filter) !== -1;
        });
      }),
      R.sortBy(R.prop(sortBy)),
      result => {
        if (sortOrder === -1) {
          return R.reverse(result);
        }
        return result;
      },
    );

    const filteredItems = filterItems(items);

    return (
      <div className="my-5">
        <h5>{friendlyName}</h5>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search"
            className="mb-2"
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <InputGroupAddon>
            <Button outline color="primary" onClick={() =>
              downloadCsv(filteredItems, columns.reduce((acc, col) => {
                acc[col.value] = col.text;
                return acc;
              }, {} as any))
            }>
              Export to CSV
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.value}>
                  <a href="javascript:" onClick={() => this.sort(col.value)}>
                    {col.text}
                    {sortBy === col.value && (
                      <span>
                        {' '}
                        <FontAwesome
                          name={
                            sortOrder === 1
                              ? 'sort-alpha-asc'
                              : 'sort-alpha-desc'
                          }
                        />
                      </span>
                    )}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.ownerEmail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Result;
