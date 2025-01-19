'use client'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

interface Column {
  id: 'property' | 'value1' | 'value2'
  label: string
  minWidth?: number
  align?: 'center'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'property', label: 'Property', minWidth: 170 },
  { id: 'value1', label: 'Rule 269', minWidth: 100 },
  {
    id: 'value2',
    label: 'Rule 364',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  }
]

interface Data {
  property: string
  value1: string
  value2: string
}

function createData (
  property: string,
  value1: string,
  value2: string
): Data {
  return { property, value1, value2 }
}

interface ruleType {
  alias: string | null,
  backgroundRate: string | null,
  buildID: string | null,
  buildTarget: string | null,
  channel: string | null,
  comment: string | null,
  data_version: string | null,
  distVersion: string | null,
  distribution: string | null,
  fallbackMapping: string | null,
  headerArchitecture: string | null,
  instructionSet: string | null,
  jaws: string | null,
  locale: string | null,
  mapping: string | null,
  memory: string | null,
  mig64: string | null,
  osVersion: string | null,
  priority: string | null,
  product: string | null,
  rule_id: string | null,
  update_type: string | null,
  version: string | null
}

const style = {
  backgroundColor: '#FAFAFA'
}

const rule1 = {
  alias: null,
  backgroundRate: '100',
  buildID: null,
  buildTarget: null,
  channel: "release*",
  comment: "GTK+ < v3.4 blocking rule, bug 1270358",
  data_version: '7',
  distVersion: null,
  distribution: null,
  fallbackMapping: null,
  headerArchitecture: null,
  instructionSet: null,
  jaws: null,
  locale: null,
  mapping: "GTK3-Desupport",
  memory: null,
  mig64: null,
  osVersion: "GTK 2,GTK 3.0.,GTK 3.1.,GTK 3.2.,GTK 3.3.",
  priority: '970',
  product: "Firefox",
  rule_id: '341',
  update_type: "minor",
  version: "<46.0"
  };
  const rule2 = {
  alias: null,
  backgroundRate: '100',
  buildID: null,
  buildTarget: null,
  channel: "release",
  comment: "bug 1270358",
  data_version: '7',
  distVersion: null,
  distribution: null,
  fallbackMapping: null,
  headerArchitecture: null,
  instructionSet: null,
  jaws: null,
  locale: null,
  mapping: "GTK3-Desupport",
  memory: null,
  mig64: null,
  osVersion: "GTK 2,GTK 3.0.,GTK 3.1.",
  priority: '970',
  product: "Firefox",
  rule_id: '365',
  update_type: "minor",
  version: "<40.0"
  };

  const makeData = (rule1:ruleType,rule2:ruleType)=>{
    let allData = [];
    let translations = {
      alias: ['alias','Alias'],
      backgroundRate: ['backgroundRate','Background Rate'],
      buildID: ['buildID','Build ID'],
      buildTarget: ['buildTarget','Build Target'],
      channel: ['channel','Channel'],
      comment: ['comment','Comment'],
      data_version: ['data_version','Data Version'],
      distVersion: ['distVersion','Dist Version'],
      distribution: ['distribution','Distribution'],
      fallbackMapping: ['fallbackMapping','Fallback Mapping'],
      headerArchitecture: ['headerArchitecture','Header Architecture'],
      instructionSet: ['instructionSet','Instruction Set'],
      jaws: ['jaws','Jaws'],
      locale: ['locale','Locale'],
      mapping: ['mapping','Mapping'],
      memory: ['memory','Memory'],
      mig64: ['mig64','Mig 64'],
      osVersion: ['osVersion','OS Version'],
      priority: ['priority','Priority'],
      product: ['product','Product'],
      rule_id: ['rule_id','Rule ID'],
      update_type: ['update_type','Update Type'],
      version: ['version','Version']
    }
    if(rule1 || rule2){
      const keys = Object.values(translations);
      const rule1Values = Object.values(rule1);
      const rule2Values = Object.values(rule2);
      for(const k in keys){
        allData.push(createData(keys[k][1],rule1Values[k] || 'n/a',rule2Values[k] || 'n/a'))
      }
    }
    return allData;
  }

const rows = makeData(rule1,rule2);

export default function StickyHeadTable () {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className='page-wrapper'>
      <Paper sx={{ width: '868px', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '720px' }} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: style.backgroundColor }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  const no = index;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={no}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ backgroundColor: style.backgroundColor }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ backgroundColor: style.backgroundColor }}
          rowsPerPageOptions={[15, 20, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
