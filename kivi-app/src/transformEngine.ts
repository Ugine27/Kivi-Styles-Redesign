import { Mode } from './useKiviInput';

// A deterministic mocked logic layer
export function transformText(rawText: string, mode: Mode, degree: number): string {
  const responses: Record<Mode, Record<number, string>> = {
    PULSE: {
      1: "yo team, server's dead again. need a reboot asap.",
      2: "Hey everyone, the server is down. Let's reboot the main instance.",
      3: "Hi team, the main server instance is currently down. Please initiate a reboot as soon as possible.",
      4: "Team, please be advised that the main server instance is offline. An immediate reboot is required.",
      5: "URGENT: Main server instance offline. Immediate reboot sequence authorized and required."
    },
    LEGO: {
      1: "`reboot_server(main_instance)`",
      2: "- Action: Reboot\n- Target: Main Server",
      3: "```json\n{\n  \"action\": \"reboot\",\n  \"target\": \"main_instance\",\n  \"priority\": \"high\"\n}\n```",
      4: "### Incident Report\n- **Issue**: Main instance down\n- **Resolution**: Immediate reboot required.",
      5: "```typescript\nasync function resolveIncident() {\n  await server.reboot('main_instance');\n}\n```"
    },
    FLOW: {
      1: "So the server crashed again and we gotta reboot it now.",
      2: "The server has unfortunately crashed again, requiring an immediate reboot.",
      3: "We are currently experiencing another server outage. We need to reboot the main instance immediately to restore functionality.",
      4: "Due to an unexpected failure in the main server instance, it is imperative that we perform a system reboot immediately to minimize downtime.",
      5: "A critical failure has occurred within the primary server infrastructure. To circumvent prolonged operational disruption, an immediate system reboot is mandated."
    }
  };

  return responses[mode][degree] || rawText;
}
