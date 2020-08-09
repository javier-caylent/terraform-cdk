import { Testing, TerraformStack, TerraformVariable, PrimitiveVariableType, CollectionVariableType, CollectionType, TupleVariableType, ObjectVariableType } from '../lib';
import { TestResource } from './helper'

test('string type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: PrimitiveVariableType.STRING
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('number type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: PrimitiveVariableType.NUMBER
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('bool type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: PrimitiveVariableType.BOOL
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('any type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: PrimitiveVariableType.ANY
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('default value', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        default: 'my-val'
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('description', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        description: 'A Test Variable'
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('collection type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: CollectionVariableType.LIST_STRING
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('set collection type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: CollectionVariableType.SET.of(PrimitiveVariableType.NUMBER)
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('map collection type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: new CollectionVariableType(CollectionType.MAP, PrimitiveVariableType.BOOL)
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('tuple type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: new TupleVariableType([PrimitiveVariableType.BOOL, new CollectionVariableType(CollectionType.LIST, PrimitiveVariableType.NUMBER)])
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('object type', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    new TerraformVariable(stack, 'test-variable', {
        type: new ObjectVariableType({ internal: PrimitiveVariableType.NUMBER, protocol: PrimitiveVariableType.STRING }),
        default: { internal: 8300, protocol: 'tcp' }
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});

test('reference', () => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'test');

    const variable = new TerraformVariable(stack, 'test-variable', {
        type: PrimitiveVariableType.STRING
    });

    new TestResource(stack, 'test-resource', {
        name: variable.stringValue
    });
    expect(Testing.synth(stack)).toMatchSnapshot();
});