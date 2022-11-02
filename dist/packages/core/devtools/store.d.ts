import type { SequenceHash } from '../types';
declare const sequenceDetails: Record<SequenceHash, {
    slotName: string;
    sourceURL?: string;
}>;
export declare const debugData: {
    getChildrenSequences: (debugSequenceHash: SequenceHash) => SequenceHash[];
    addCSSRule: (rule: string) => void;
    addSequenceDetails: <Slots extends string | number>(classNamesForSlots: Record<Slots, string>, sourceURL?: string | undefined) => void;
    getCSSRules: () => string[];
    getSequenceDetails: (sequenceHash: SequenceHash) => typeof sequenceDetails[string] | undefined;
};
export {};
