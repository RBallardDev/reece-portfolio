export type CreativeGallery = {
  id: string;
  title: string;
  count: number;
  countLabel: string;
  theme: {
    gradient: string;
    accent: string;
  };
};

export const creativeGalleries: CreativeGallery[] = [
  {
    id: "photography",
    title: "Photography",
    count: 13,
    countLabel: "Photos",
    theme: {
      gradient: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      accent: "#74b9ff",
    },
  },
  {
    id: "video-edits",
    title: "Video Edits",
    count: 8,
    countLabel: "Videos",
    theme: {
      gradient: "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
      accent: "#fd79a8",
    },
  },
  {
    id: "design",
    title: "Design Experiments",
    count: 12,
    countLabel: "Designs",
    theme: {
      gradient: "linear-gradient(135deg, #00b894 0%, #55efc4 100%)",
      accent: "#ffeaa7",
    },
  },
  {
    id: "street",
    title: "Street",
    count: 24,
    countLabel: "Photos",
    theme: {
      gradient: "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)",
      accent: "#fab1a0",
    },
  },
  {
    id: "events",
    title: "Events",
    count: 31,
    countLabel: "Photos",
    theme: {
      gradient: "linear-gradient(135deg, #e84393 0%, #fd79a8 100%)",
      accent: "#dfe6e9",
    },
  },
  {
    id: "travel",
    title: "Travel",
    count: 47,
    countLabel: "Photos",
    theme: {
      gradient: "linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)",
      accent: "#81ecec",
    },
  },
];



