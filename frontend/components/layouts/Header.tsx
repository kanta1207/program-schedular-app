'use client';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const nonNestedMenu = [
  {
    name: 'Schedules',
    path: '/schedules',
  },
  {
    name: 'Instructors',
    path: '/instructors',
  },
  {
    name: 'Cohorts',
    path: '/cohorts',
  },
];

const schoolCalendarMenu = [
  {
    name: 'Intakes',
    path: '/intakes',
  },
  {
    name: 'Breaks',
    path: '/breaks',
  },
];

const curriculumMenu = [
  {
    name: 'Programs',
    path: '/programs',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
];

const settings = [
  {
    name: 'Logout',
    path: '/logout',
  },
];

const Header = () => {
  const pathname = usePathname();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSchoolCalendar, setAnchorElSchoolCalendar] = useState<null | HTMLElement>(null);
  const [anchorElCurriculum, setAnchorElCurriculum] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSchoolCalendarMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSchoolCalendar(event.currentTarget);
  };

  const handleCloseSchoolCalendarMenu = () => {
    setAnchorElSchoolCalendar(null);
  };

  const handleOpenCurriculumMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCurriculum(event.currentTarget);
  };

  const handleCloseCurriculumMenu = () => {
    setAnchorElCurriculum(null);
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/schedules">
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo-transparent.png"
                sizes="100%"
                fill
                alt="college logo"
                className="object-contain"
              />
            </div>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: '1rem', marginLeft: '3rem' }}>
            {nonNestedMenu.map((navItem) => (
              <Button
                key={navItem.path}
                href={navItem.path}
                component="a"
                sx={{
                  my: 2,
                  color: 'white',
                  textDecoration: navItem.path === pathname ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                }}
              >
                {navItem.name}
              </Button>
            ))}

            <Box>
              <Button
                sx={{ my: 2, color: 'white' }}
                onClick={handleOpenSchoolCalendarMenu}
                endIcon={<KeyboardArrowDownIcon />}
              >
                School Calendar
              </Button>
              <Menu
                anchorEl={anchorElSchoolCalendar}
                open={Boolean(anchorElSchoolCalendar)}
                onClose={handleCloseSchoolCalendarMenu}
              >
                {schoolCalendarMenu.map((menuItem) => (
                  <Link key={menuItem.path} href={menuItem.path}>
                    <MenuItem onClick={handleCloseSchoolCalendarMenu}>{menuItem.name}</MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box>
              <Button
                sx={{ my: 2, color: 'white' }}
                onClick={handleOpenCurriculumMenu}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Curriculum
              </Button>
              <Menu
                anchorEl={anchorElCurriculum}
                open={Boolean(anchorElCurriculum)}
                onClose={handleCloseCurriculumMenu}
              >
                {curriculumMenu.map((menuItem) => (
                  <Link key={menuItem.path} href={menuItem.path}>
                    <MenuItem onClick={handleCloseCurriculumMenu}>{menuItem.name}</MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Rodrigo" src="/" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
