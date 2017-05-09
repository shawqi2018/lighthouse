"use strict";require("../../base/iteration_helpers.js");require("./diagnostic.js");require("./value_ref.js");'use strict';global.tr.exportTo('tr.v.d',function(){class RelatedValueSet extends tr.v.d.Diagnostic{constructor(opt_values){super();this.valuesByGuid_=new Map();if(opt_values)for(var value of opt_values)this.add(value);}add(value){if(!(value instanceof tr.v.Histogram)&&!(value instanceof tr.v.d.ValueRef))throw new Error('Must be instanceof Histogram or ValueRef: '+value);if(this.valuesByGuid_.get(value.guid))throw new Error('Tried to add same value twice');this.valuesByGuid_.set(value.guid,value);}has(value){return this.valuesByGuid_.has(value.guid);}get length(){return this.valuesByGuid_.size;}*[Symbol.iterator](){for(var[guid,value]of this.valuesByGuid_)yield value;}resolve(valueSet,opt_required){for(var[guid,value]of this.valuesByGuid_){if(!(value instanceof tr.v.d.ValueRef))continue;value=valueSet.lookup(guid);if(value instanceof tr.v.Histogram)this.valuesByGuid_.set(guid,value);else if(opt_required)throw new Error('Unable to find Histogram '+guid);}}asDictInto_(d){d.guids=[];for(var value of this)d.guids.push(value.guid);}static fromDict(d){return new RelatedValueSet(d.guids.map(guid=>new tr.v.d.ValueRef(guid)));}}tr.v.d.Diagnostic.register(RelatedValueSet,{elementName:'tr-v-ui-related-value-set-span'});return{RelatedValueSet:RelatedValueSet};});