// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import React from 'react';

import * as rjsf from 'react-jsonschema-form';

import { JSONObject, JSONValue } from '@phosphor/coreutils';

import { Form } from '@jupyterlab/ui-components';

import { VDomModel, VDomRenderer } from './vdom';

/**
 * The id prefix all JSON Schema forms will share
 */
const SCHEMA_FORM_ID_PREFIX = 'id-jp-schemaform';

/**
 * The class all JSON Schema forms will share
 */
const SCHEMA_FORM_CLASS = 'jp-SchemaForm';

/**
 * Am opionated widget for displaying a form defined by JSON Schema
 */
export class BodyForm<T extends JSONValue> extends VDomRenderer<
  BodyForm.Model<T>
> {
  /**
   * Construct a new Model
   */
  constructor(options?: rjsf.FormProps<T>) {
    super();
    this._idPrefix = `${SCHEMA_FORM_ID_PREFIX}-${Private.nextId()}`;
    this.model = new BodyForm.Model<T>(options);
  }

  /**
   * Render the form, if the model is available
   */
  render() {
    if (!this.model) {
      return null;
    }

    const {
      ArrayFieldTemplate,
      autocomplete,
      className,
      disabled,
      ErrorList,
      fields,
      FieldTemplate,
      formContext,
      formData,
      liveValidate,
      noHtml5Validate,
      noValidate,
      ObjectFieldTemplate,
      safeRenderCompletion,
      schema,
      showErrorList,
      transformErrors,
      uiSchema,
      validate,
      widgets
    } = this.model;

    const props = {
      className: `${SCHEMA_FORM_CLASS} ${className}`,
      idPrefix: this._idPrefix,
      onChange: this.onChange,
      ArrayFieldTemplate,
      autocomplete,
      disabled,
      ErrorList,
      fields,
      FieldTemplate,
      formContext,
      formData,
      liveValidate,
      noHtml5Validate,
      noValidate,
      ObjectFieldTemplate,
      safeRenderCompletion,
      schema,
      showErrorList,
      transformErrors,
      uiSchema,
      validate,
      widgets
    };
    console.log(props);

    return <Form {...props} />;
  }

  /**
   * Handle the change of a form by the user and update the model
   */
  onChange = (evt: rjsf.IChangeEvent<T>, _err?: rjsf.ErrorSchema) => {
    const { formData, errors } = evt;
    if (formData != null) {
      this.model.errors = errors;
      this.model.formData = formData;
    }
  };

  /**
   * Get the JSON object specified by the user, along with any validation errors
   */
  getValue() {
    return {
      formData: this.model.formData,
      errors: this.model.errors
    };
  }

  /**
   * The id prefix to use for all form children
   */
  private _idPrefix: string;
}

/**
 * A namespace for JSON Schema form-related items
 */
export namespace BodyForm {
  export class Model<T extends JSONValue> extends VDomModel {
    constructor(options?: rjsf.FormProps<T>) {
      super();
      for (let [key, value] of Object.entries(options || {})) {
        this[key as keyof rjsf.FormProps<T>] = value;
      }
    }
    /**
     * Get the validation errors for the current form, as defined by the schema
     */
    get errors(): rjsf.AjvError[] {
      return this._errors;
    }

    /**
     * Set the validation errors for the current form
     *
     * This should be considered read-only (to be written by the form onChange)
     */
    set errors(errors: rjsf.AjvError[]) {
      this._errors = errors;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the (potentially invalid) form as validated by the schema
     */
    get formData(): T {
      return this._formData;
    }

    /**
     * Set the form data to be validated by the schema
     */
    set formData(formData: T) {
      this._formData = formData;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the (potentially invalid) form as validated by the schema
     */
    get formContext(): any {
      return this._formContext;
    }

    /**
     * Set the form data to be validated by the schema
     */
    set formContext(formContext: any) {
      this._formContext = formContext;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the JSON Schema that defines the form
     */
    get schema(): JSONObject {
      return this._schema;
    }

    /**
     * Set the JSON Schema that defines the form
     */
    set schema(schema: JSONObject) {
      this._schema = schema;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the UI schema for the JSON schema form
     */
    get uiSchema() {
      return this._uiSchema;
    }

    /**
     * Set the UI schema for the JSON schema form
     *
     * See https://react-jsonschema-form.readthedocs.io/en/latest/form-customization/#the-uischema-object
     */
    set uiSchema(uiSchema) {
      this._uiSchema = uiSchema;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get whether per-keystroke validation will be applied
     */
    get liveValidate(): boolean {
      return this._liveValidate;
    }

    /**
     * Set whether per-keystroke validation will be applied
     */
    set liveValidate(liveValidate: boolean) {
      this._liveValidate = liveValidate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get additional space-separated classes to be added to the form
     */
    get className(): string {
      return this._className;
    }

    /**
     * Get additional space-separated classes to be added to the form
     */
    set className(className: string) {
      this._className = className;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get autocomplete
     */
    get autocomplete(): string {
      return this._autocomplete;
    }

    /**
     * Get additional space-separated classes to be added to the form
     */
    set autocomplete(autocomplete: string) {
      this._autocomplete = autocomplete;
      this.stateChanged.emit(void 0);
    }

    /**
     * Whether the form and all its children should be disabled
     */
    get disabled(): boolean {
      return this._disabled;
    }

    /**
     * Set whether the form and all its children should be disabled
     */
    set disabled(disabled) {
      this._disabled = disabled;
      this.stateChanged.emit(void 0);
    }

    /**
     * Whether the form and all its children should be disabled
     */
    get safeRenderCompletion(): boolean {
      return this._safeRenderCompletion;
    }

    /**
     * Set whether the form and all its children should be disabled
     */
    set safeRenderCompletion(safeRenderCompletion) {
      this._safeRenderCompletion = safeRenderCompletion;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get custom rjsf widget overrides
     */
    get widgets() {
      return this._widgets;
    }

    /**
     * Set custom rjsf widget overrides
     */
    set widgets(widgets) {
      this._widgets = widgets;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get custom rjsf fields overrides
     */
    get fields() {
      return this._fields;
    }

    /**
     * Set custom rjsf widget overrides
     */
    set fields(fields) {
      this._fields = fields;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get whether validation is entirely disabled
     */
    get noValidate() {
      return this._noValidate;
    }

    /**
     * Set whether validation is entirely disabled
     */
    set noValidate(noValidate) {
      this._noValidate = noValidate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get whether standard browser validation will be disabled
     */
    get noHtml5Validate() {
      return this._noHtml5Validate;
    }

    /**
     * Set  whether standard browser validation will be disabled
     */
    set noHtml5Validate(noHtml5Validate) {
      this._noHtml5Validate = noHtml5Validate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get whether the error list will be shown
     */
    get showErrorList() {
      return this._showErrorList;
    }

    /**
     * Set  whether standard browser validation will be disabled
     */
    set showErrorList(showErrorList) {
      this._showErrorList = showErrorList;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom React component to render errors
     */
    get ErrorList() {
      return this._ErrorList;
    }

    /**
     * Get the custom React component to render errors
     */
    set ErrorList(ErrorList) {
      this._ErrorList = ErrorList;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom React component to render fields
     */
    get FieldTemplate() {
      return this._FieldTemplate;
    }

    /**
     * Get the custom React component to render fields
     */
    set FieldTemplate(FieldTemplate) {
      this._FieldTemplate = FieldTemplate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom React component to render array fields
     */
    get ArrayFieldTemplate() {
      return this._ArrayFieldTemplate;
    }

    /**
     * Get the custom React component to render array fields
     */
    set ArrayFieldTemplate(ArrayFieldTemplate) {
      this._ArrayFieldTemplate = ArrayFieldTemplate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom React component to render object fields
     */
    get ObjectFieldTemplate() {
      return this._ObjectFieldTemplate;
    }

    /**
     * Get the custom React component to render object fields
     */
    set ObjectFieldTemplate(ObjectFieldTemplate) {
      this._ObjectFieldTemplate = ObjectFieldTemplate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom validation function
     */
    get validate() {
      return this._validate;
    }

    /**
     * Set the custom validation function
     */
    set validate(validate) {
      this._validate = validate;
      this.stateChanged.emit(void 0);
    }

    /**
     * Get the custom error transformer
     */
    get transformErrors() {
      return this._transformErrors;
    }

    /**
     * Set the custom error transformer
     */
    set transformErrors(transformErrors) {
      this._transformErrors = transformErrors;
      this.stateChanged.emit(void 0);
    }

    get onChange() {
      return;
    }
    set onChange(_) {
      console.warn('Setting onChange is not supported, use model state');
    }

    get onError() {
      return;
    }
    set onError(_) {
      console.warn('Setting onError is not supported, use model state');
    }

    get onSubmit() {
      return;
    }
    set onSubmit(_) {
      console.warn('Setting onSubmit is not supported, use model state');
    }

    get idPrefix() {
      return;
    }
    set idPrefix(_) {
      console.warn('Setting idPrefix is not supported');
    }

    get id() {
      return;
    }
    set id(_) {
      console.warn('Setting id is not supported');
    }

    get name() {
      return;
    }
    set name(_) {
      console.warn('Setting name is not supported');
    }

    get method() {
      return;
    }
    set method(_) {
      console.warn('Setting method is not supported');
    }

    get target() {
      return;
    }
    set target(_) {
      console.warn('Setting target is not supported');
    }

    get action() {
      return;
    }
    set action(_) {
      console.warn('Setting action is not supported');
    }

    get enctype() {
      return;
    }
    set enctype(_) {
      console.warn('Setting enctype is not supported');
    }

    get acceptcharset() {
      return;
    }
    set acceptcharset(_) {
      console.warn('Setting acceptcharset is not supported');
    }

    private _ArrayFieldTemplate: React.StatelessComponent<
      rjsf.ArrayFieldTemplateProps
    >;
    private _autocomplete: string;
    private _className = '';
    private _disabled = false;
    private _errors: rjsf.AjvError[] = [];
    private _ErrorList: React.StatelessComponent<rjsf.ErrorListProps>;
    private _fields: { [name: string]: rjsf.Field } = null;
    private _FieldTemplate: React.StatelessComponent<rjsf.FieldTemplateProps>;
    private _formContext: any;
    private _formData: T = null;
    private _liveValidate = true;
    private _noHtml5Validate = false;
    private _noValidate = false;
    private _ObjectFieldTemplate: React.StatelessComponent<
      rjsf.ObjectFieldTemplateProps
    >;
    private _safeRenderCompletion = false;
    private _schema: JSONObject = {};
    private _showErrorList = false;
    private _transformErrors: (errors: rjsf.AjvError[]) => rjsf.AjvError[];
    private _uiSchema: JSONObject = {};
    private _validate: (
      formData: T,
      errors: rjsf.FormValidation
    ) => rjsf.FormValidation;
    private _widgets: { [name: string]: rjsf.Widget } = null;
  }
}

namespace Private {
  let _nextId = 0;

  /**
   * Return the next id to be used for the created form children
   */
  export function nextId() {
    return _nextId++;
  }
}
