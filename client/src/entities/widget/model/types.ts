export enum BuiltInWidgetEnum {
  Clock = 'clock'
}
export type BuiltInWidget = (typeof BuiltInWidgetEnum)[keyof typeof BuiltInWidgetEnum];