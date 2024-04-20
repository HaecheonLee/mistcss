import assert from 'node:assert/strict'
import test from 'node:test'

import { Data } from '../parser.js'
import { render } from './react.js'

void test('render', () => {
  const filename = 'component.mist.css'

  const data: Data = {
    tag: 'div',
    className: 'foo',
    attributes: {
      'data-attr': new Set(['a', 'b']),
      'data-attr-foo-bar': new Set(['foo-bar']),
    },
    booleanAttributes: new Set(['data-is-foo']),
    properties: new Set(['--prop-foo', '--prop-bar']),
  }

  const actual = render(filename, data)
  assert.equal(
    actual,
    `// Generated by MistCSS, do not modify
import './component.mist.css.mist.css'

import type { JSX, PropsWithChildren } from 'react'

type Props = {
  attr?: 'a' | 'b'
  attrFooBar?: 'foo-bar'
  isFoo?: boolean
  propFoo?: string
  propBar?: string
} & JSX.IntrinsicElements['div']

export function Foo({ children, attr, attrFooBar, isFoo, propFoo, propBar, ...props }: PropsWithChildren<Props>) {
  return (
    <div
      {...props}
      data-attr={attr}
      data-attr-foo-bar={attrFooBar}
      data-is-foo={isFoo}
      style={{ '--prop-foo': propFoo, '--prop-bar': propBar }}
      className="foo"
    >
      {children}
    </div>
  )
}
`,
  )
})