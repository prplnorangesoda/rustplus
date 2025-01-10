type Long = import("long").default;

declare module "@liamcottle/rustplus.js" {
  interface AppMessage {
    response: AppResponse | null;
    broadcast: AppBroadcast | null;
  }
  interface AppResponse {
    seq: number;
    success: {} | null;
    error: { error: string } | null;
    info: AppInfo | null;
    time: string | null;
    teamInfo: AppTeamInfo | null;
    teamChat: AppTeamChat | null;
    entityInfo: AppEntityInfo | null;
    flag: AppFlag | null;
    mapMarkers: AppMapMarkers | null;
    clanInfo: AppClanInfo | null;
    clanChat: AppClanChat | null;
    nexusAuth: AppNexusAuth | null;
    cameraSubscribeInfo: AppCameraInfo | null;
  }

  interface AppBroadcast {
    teamChanged: AppTeamChanged | null;
    teamMessage: AppNewTeamMessage | null;
    entityChanged: AppEntityChanged | null;
    clanChanged: AppClanChanged | null;
    clanMessage: AppNewClanMessage | null;
    cameraRays: AppCameraRays | null;
  }
  interface AppTeamChanged {
    playerId: Long;
    teamInfo: AppTeamInfo;
  }
  interface AppTeamInfo {
    members: Member[];
    mapNotes: Note[];
    leaderMapNotes: Note[];
    leaderSteamId: Long;
  }
  interface Member {
    steamId: Long;
    name: string;
    x: number;
    y: number;
    spawnTime: number;
    isAlive: boolean;
    deathTime: number;
  }
  interface AppInfo {
    name: string;
    headerImage: string;
    url: string;
    map: string;
    mapSize: number;
    wipeTime: number;
    players: number;
    maxPlayers: number;
    queuedPlayers: number;
    seed: number | null;
    salt: number | null;
    logoImage: string | null;
    nexus: string | null;
    nexusId: number | null;
    nexusZone: string | null;
  }
}
