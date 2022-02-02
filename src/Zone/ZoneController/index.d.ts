import { Zone, SettingsGroup, SettingsGroupProperties } from 'Zone/index';

/**
 * Houses all of the Zones in the game and allows
 * management of settings groups.
 */
declare namespace ZoneController {
	/** Returns all registered zones. */
	export function getZones(): Zone[];

	/**
	 * Returns zones that are touching and the corresponding parts that are touching.
	 * Because Typescript does not support BasePart index signatures,
	 * the touching parts are of type unknown.
	 *
	 * The actual type is below, the part is the index and the
	 * value is the corresponding zone.
	 * ```ts
	 * { [part: BasePart]: Zone }
	 * ```
	 */
	export function getTouchingZones(): LuaTuple<[touchingZones: Zone[], touchingParts: unknown]>;

	/**
	 * Sets properties associated with the specified settings group name.
	 * A zone can be bound to a group using {@link Zone.bindToGroup()}.
	 * If no properties are specified, the default properties are used.
	 */
	export function setGroup(
		settingsGroupName: string,
		properties?: SettingsGroupProperties,
	): SettingsGroup;

	/**
	 * Returns the settings group associated with the specified
	 * settings group name.
	 */
	export function getGroup(settingsGroupName: string): SettingsGroup | undefined;
}

export { ZoneController };
