import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
  TableSortLabel,
  LinearProgress,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDataContext } from "context/DataContext";
import { DateRange } from "types";
import { formatDuration } from "utils/formatSongDuration";
import { CBox } from "components";
import { Song } from "models/schema";
import { useModal, useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { LibraryService } from "services/Library.Services";
import SongDetailsDialog from "../SongDetailsDialog";

interface LibraryTableProps {
  dateRange: DateRange;
}
export interface SongWithProviderName extends Omit<Song, "provider"> {
  provider: string;
}

const LibraryTable: React.FC<LibraryTableProps> = ({ dateRange }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Song | null>(null);

  const handleRequestSort = (property: keyof Song) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const modal = useModal();

  const { getSongs, getProviders } = useDataContext();

  const { data, loading, hasMore, error, loadMore } = getSongs;

  const getSongsByDateRange = useService<Song[]>({
    type: QueryType.MUTATION,
    onRequestService: LibraryService.getSongsByDateRange,
  });

  type Order = "asc" | "desc";

  const songsData = getSongsByDateRange.data ?? data;

  const songsWithProviders: SongWithProviderName[] = songsData.map((song) => {
    const providerName = getProviders.data?.find(
      (provider) => provider.id === song.provider.id
    )?.name;

    return {
      ...song,
      provider: providerName || "Unknown Provider",
    };
  });

  const sortedSongs: SongWithProviderName[] = orderBy
    ? songsWithProviders?.sort((a, b) => {
        if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
          return order === "asc"
            ? (a[orderBy] as number) - (b[orderBy] as number)
            : (b[orderBy] as number) - (a[orderBy] as number);
        } else {
          return order === "asc"
            ? (a[orderBy] as string).localeCompare(b[orderBy] as string)
            : (b[orderBy] as string).localeCompare(a[orderBy] as string);
        }
      })
    : songsWithProviders;

  useEffect(() => {
    getProviders.onRequest();
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      getSongsByDateRange.onRequest({
        dateRange,
      });
    }
  }, [dateRange]);

  return (
    <React.Fragment>
      <Box flex={1} overflow={"auto"}>
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table className="user__table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                  >
                    Song ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "duration"}
                    direction={orderBy === "duration" ? order : "asc"}
                    onClick={() => handleRequestSort("duration")}
                  >
                    Song Length
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "bpm"}
                    direction={orderBy === "bpm" ? order : "asc"}
                    onClick={() => handleRequestSort("bpm")}
                  >
                    BPM
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "provider"}
                    direction={orderBy === "provider" ? order : "asc"}
                    onClick={() => handleRequestSort("provider")}
                  >
                    Provider
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleRequestSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "timesPlayed"}
                    direction={orderBy === "timesPlayed" ? order : "asc"}
                    onClick={() => handleRequestSort("timesPlayed")}
                  >
                    Times Played
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "timesSkipped"}
                    direction={orderBy === "timesSkipped" ? order : "asc"}
                    onClick={() => handleRequestSort("timesSkipped")}
                  >
                    Times Skipped
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSongs?.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{formatDuration(song.duration)}</TableCell>
                  <TableCell>{song.bpm}</TableCell>
                  <TableCell>{song.provider}</TableCell>
                  <TableCell>{song.status}</TableCell>
                  <TableCell>{song.timesPlayed}</TableCell>
                  <TableCell>{song.timesSkipped}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        modal.setData(
                          songsData.find((originalSong) => originalSong.id === song.id)
                        );
                        modal.openModal();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CBox col ac py={2} width={"100%"}>
            {loading && <LinearProgress sx={{ width: "100%" }} />}
            {!getSongsByDateRange.data && hasMore && !loading && (
              <Button variant="rounded" onClick={loadMore}>
                Load more
              </Button>
            )}
          </CBox>
        </TableContainer>
      </Box>
      <SongDetailsDialog data={modal.data} onClose={modal.closeModal} open={modal.isOpen} />
    </React.Fragment>
  );
};

export default LibraryTable;
