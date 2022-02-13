import { Enum } from './Enum';
import { Signal } from './Signal';

/** Represents the result that is returned from most find operations. */
type FindResult =
	| LuaTuple<[isWithinZone: true, touchingParts: BasePart[]]>
	| LuaTuple<[isWithinZone: false, touchingParts: undefined]>;

/** Represents a model with a humanoid and HRP. */
type CharacterOrNPC = Model & { Humanoid: Humanoid; HumanoidRootPart: BasePart };

/** Represents a model (usually a character) or a part. */
type Item = BasePart | CharacterOrNPC;

interface SettingsGroupProperties {
	/**
	 * When set to `true`, it prevents items (players, parts, etc)
	 * from entering multiple zones at once within that group.
	 * This is by default `true`.
	 */
	onlyEnterOnceExitedAll: boolean;
}

interface SettingsGroup extends SettingsGroupProperties {}

/**
 * A dynamic zone that utilizes region checking, raycasting and
 * the new {@link BasePart.CanTouch} property to effectively determine
 * players and parts within their boundaries.
 */
declare class Zone {
	/**
	 * Houses all enums used by the Zone class.
	 */
	public static enum: typeof Enum;

	/**
	 * Constructs a zone from the given CFrame and Size. Underneat
	 * the hood, it's creating a part (or multiple parts if any size
	 * coordinage exceeds 2024), parenting this to a folder (the container),
	 * constructing a zone with this container, calling {@link relocate()} on that
	 * zone (which parents it outside of the workspace), then finally returning the zone.
	 */
	public static fromRegion(cframe: CFrame, size: Vector3): Zone;

	/** Constructs a zone with boundaries defined by the specified part. */
	public constructor(part: BasePart);

	/** Constructs a zone with boundaries defined by the specified parts. */
	public constructor(parts: BasePart[]);

	/** Constructs a zone with boundaries defined by any part descendants of the specified instance. */
	public constructor(container: Instance);

	/**
	 * Returns whether the {@link Players.LocalPlayer} is in the zone.
	 * This will error when called on the server.
	 */
	public findLocalPlayer(): boolean;

	/** Returns whether the specified player is in the zone. */
	public findPlayer(player: Player): boolean;

	/** Returns whether the specified part is in the zone. */
	public findPart(part: BasePart): FindResult;

	/** Returns whether the specified item is in the zone. */
	public findItem(item: Item): FindResult;

	/** Returns whether the specified point is in the zone. */
	public findPoint(point: Vector3): FindResult;

	/** Returns all the players currently in the zone. */
	public getPlayers(): Player[];

	/** Returns all the BaseParts that are curently in the zone. */
	public getParts(): BasePart[];

	/** Returns all the items that are currently in the zone. */
	public getItems(): Item[];

	/** Returns a random position inside of the zone. */
	public getRandomPoint(): LuaTuple<[randomVector: Vector3, touchingParts: BasePart[]]>;

	/**
	 * This is used to detect your own custom instances with zones, such as NPCs, and is
	 * a recommended replacement for part-events/methods.
	 *
	 * An item can be any BasePart or Character/NPC (i.e. a model with a Humanoid and
	 * HuanoidRootPart). Once tracked, it can be listened for with the {@link itemEntered} and
	 * {@link itemExited} events.
	 *
	 * An item will be automatically untracked if it is destroyed or deparented.
	 */
	public trackItem(item: Item): void;

	/** Removes an item from the tracked items. */
	public untrackItem(item: Item): void;

	/**
	 * This is used to bind a zone to a settings group to enhance the default
	 * behaviour of a collection of zones. The properties of a settings group can
	 * be viewed and customized with the ZoneController.
	 *
	 * This method is particularly useful for zones where you want to guarantee
	 * the player/item is not in two zones at once. For example, when working with
	 * ambient/music/lighting zones which perfectly border each other.
	 *
	 * If no group by the specified name exists, a new group is created automatically.
	 * Binding will replace any group that the zone is currently bound to.
	 */
	public bindToGroup(settingsGroupName: string): void;

	/** Unbins the zone from it's current settings group. */
	public unbindFromGroup(): void;

	/** Sets the accuracy of the zone. */
	public setAccuracy(accuracy: keyof typeof Enum.Accuracy): void;

	/** Sets the detection level of the zone. */
	public setDetection(detection: keyof typeof Enum.Detection): void;

	/**
	 * Moves the zone outside of the workspace and into a separate WorldModel within
	 * ReplicateStorage, or ServerStorage. This action is irreversible, one
	 * called it cannot be undone.
	 */
	public relocate(): void;

	/**
	 * Tracks the specified item until it has entered the zone, then calls
	 * the given function. If the item is already within the zone, the
	 * function is called right away.
	 */
	public onItemEnter(item: Item, callback: () => void): void;

	/**
	 * Tracks the specified item until it has exited the zone, then calls
	 * the given function. If the item is already outside the zone, the
	 * function is called right away.
	 */
	public onItemExit(item: Item, callback: () => void): void;

	/** Disconnects all connections within the zone. */
	public destroy(): void;

	/**
	 * Fires whenever the {@link Players.LocalPlayer} enters the zone.
	 * This will not fire on the server.
	 */
	public localPlayerEntered: Signal;

	/**
	 * Fires whenever the {@link Players.LocalPlayer} exits the zone.
	 * This will not fire on the server.
	 */
	public localPlayerExited: Signal;

	/** Fires whenever a player enters the zone. */
	public playerEntered: Signal<(player: Player) => void>;

	/** Fires whenever a player exits the zone. */
	public playerExited: Signal<(player: Player) => void>;

	/**
	 * Fires whenever a part enters the zone.
	 * Note that this event only works for unanchored parts and
	 * may interfere with the parts CanCollide property, it is recommended
	 * to use {@link itemEntered} when possible.
	 */
	public partEntered: Signal<(part: BasePart) => void>;

	/**
	 * Fires whenever a part exits the zone.
	 * Note that this event only works for unanchored parts and
	 * may interfere with the parts CanCollide property, it is recommended
	 * to use {@link itemExited} when possible.
	 */
	public partExited: Signal<(part: BasePart) => void>;

	/**
	 * Fires whenever a tracked item enters the zone.
	 * To track an item see {@link trackItem()}.
	 */
	public itemEntered: Signal<(item: Item) => void>;

	/**
	 * Fires whenever a tracked item exits the zone.
	 * To track an item see {@link trackItem()}.
	 */
	public itemExited: Signal<(item: Item) => void>;

	/**
	 * The current accuracy of the zone. Defaults to {@link Enum.Accuracy.High}.
	 * To set the accuracy of the zone see {@link setAccuracy()}.
	 */
	public accuracy: Enum.Accuracy;

	/**
	 * The current enter detection level of the zone. Defaults to {@link Enum.Detection.Automatic}.
	 * To set both the enter and exit detection levels of the zone see {@link setDetection()}.
	 */
	public enterDetection: Enum.Detection;

	/**
	 * The currente nter detection level of the zone. Defaults to {@link Enum.Detection.Automatic}.
	 * To set both the enter and exit detection levels of the zone see {@link setDetection()}.
	 */
	public exitDetection: Enum.Detection;

	/**
	 * When true, the zone will update when it's group parts change size or position,
	 * or when a descendant group part is added or removed from the group.
	 * Defaults to true.
	 */
	public autoUpdate: boolean;

	/**
	 * When true, will prevent the interal update method from being called
	 * multiple times within a 0.1 second period.
	 */
	public respectUpdateQueue: boolean;

	/** An array of BaseParts that form the zone. */
	public readonly zoneParts: BasePart[];

	/** The region that represents the zone. */
	public readonly region: Region3;

	/** The volume of the zone. */
	public readonly volume: number;

	/** The WorldModel of the zone. */
	public readonly worldModel: WorldModel | Workspace;
}

export { Zone, SettingsGroup, SettingsGroupProperties };
